
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
import { Plus, Minus, Save } from 'lucide-react';
import { products as dummyProducts } from '@/data/products';
import { toast } from 'sonner';

// Add inventory status to products
type ProductWithInventory = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: number;
};

const AdminInventory = () => {
  const [inventory, setInventory] = useState<ProductWithInventory[]>([]);
  
  // Initialize with dummy data but add inventory count
  useEffect(() => {
    const productsWithInventory = dummyProducts.map(product => ({
      ...product,
      inStock: Math.floor(Math.random() * 50) // Random stock for demonstration
    }));
    
    setInventory(productsWithInventory);
  }, []);

  const updateStock = (id: number, amount: number) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, inStock: Math.max(0, item.inStock + amount) }
          : item
      )
    );
  };
  
  const handleStockChange = (id: number, value: string) => {
    const newValue = parseInt(value) || 0;
    
    setInventory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, inStock: Math.max(0, newValue) } : item
      )
    );
  };
  
  const saveInventoryChanges = () => {
    // This would save to Supabase in the full implementation
    toast.success("Inventory updated successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Inventory Management</h2>
        <Button onClick={saveInventoryChanges} className="flex items-center gap-2">
          <Save size={16} />
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
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">
                  <Input 
                    type="number" 
                    value={item.inStock} 
                    onChange={(e) => handleStockChange(item.id, e.target.value)}
                    className="w-20 text-right" 
                    min="0"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => updateStock(item.id, -1)}
                      disabled={item.inStock <= 0}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminInventory;
