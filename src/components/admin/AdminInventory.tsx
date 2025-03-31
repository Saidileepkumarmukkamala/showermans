
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Product, InventoryItem } from '@/lib/supabase';

const AdminInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [inventoryUpdates, setInventoryUpdates] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      
      // Join inventory with products to get all product information
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          *,
          product:products(*)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      const typedData = data as (InventoryItem & {product: Product})[];
      
      setInventory(typedData || []);
    } catch (error: any) {
      toast.error('Failed to fetch inventory: ' + error.message);
      console.error('Error fetching inventory:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStock = (id: string, amount: number) => {
    setInventory(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.in_stock + amount);
          setInventoryUpdates({...inventoryUpdates, [id]: true});
          return { ...item, in_stock: newStock };
        }
        return item;
      })
    );
  };
  
  const handleStockChange = (id: string, value: string) => {
    const newValue = parseInt(value) || 0;
    
    setInventory(prev => 
      prev.map(item => {
        if (item.id === id) {
          setInventoryUpdates({...inventoryUpdates, [id]: true});
          return { ...item, in_stock: Math.max(0, newValue) };
        }
        return item;
      })
    );
  };
  
  const saveInventoryChanges = async () => {
    try {
      setIsSaving(true);
      
      // Only update items that have changed
      const updates = inventory.filter(item => inventoryUpdates[item.id]);
      
      if (updates.length === 0) {
        toast.info('No changes to save');
        setIsSaving(false);
        return;
      }
      
      // Process updates in batches to avoid potential rate limits
      for (const item of updates) {
        const { error } = await supabase
          .from('inventory')
          .update({
            in_stock: item.in_stock,
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id);
          
        if (error) throw error;
      }
      
      toast.success('Inventory updated successfully');
      setInventoryUpdates({});
    } catch (error: any) {
      toast.error('Failed to update inventory: ' + error.message);
      console.error('Error updating inventory:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && inventory.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasChanges = Object.keys(inventoryUpdates).length > 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Inventory Management</h2>
        <Button 
          onClick={saveInventoryChanges} 
          className="flex items-center gap-2"
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save Changes
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>Current inventory levels</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">In Stock</TableHead>
              <TableHead>Adjust</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  No inventory items found
                </TableCell>
              </TableRow>
            ) : (
              inventory.map((item) => (
                <TableRow key={item.id} className={inventoryUpdates[item.id] ? 'bg-muted/30' : ''}>
                  <TableCell className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded overflow-hidden">
                      <img 
                        src={item.product?.image} 
                        alt={item.product?.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{item.product?.name}</span>
                  </TableCell>
                  <TableCell>{item.product?.category}</TableCell>
                  <TableCell className="text-right">
                    <Input 
                      type="number" 
                      value={item.in_stock} 
                      onChange={(e) => handleStockChange(item.id, e.target.value)}
                      className="w-20 text-right ml-auto" 
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => updateStock(item.id, -1)}
                        disabled={item.in_stock <= 0}
                      >
                        <Minus size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => updateStock(item.id, 1)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminInventory;
