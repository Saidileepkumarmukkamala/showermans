
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import ProductForm from './ProductForm';
import { Product } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) {
        throw error;
      }
      
      setProducts(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch products: ' + error.message);
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditForm = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };
  
  const openAddForm = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };
  
  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeletingId(null);
  };

  const handleDeleteProduct = async () => {
    if (!deletingId) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deletingId);
      
      if (error) {
        throw error;
      }
      
      setProducts(products.filter(product => product.id !== deletingId));
      toast.success('Product deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete product: ' + error.message);
      console.error('Error deleting product:', error);
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleFormSuccess = () => {
    closeForm();
    fetchProducts();
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Products Management</h2>
        <Button onClick={openAddForm} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Product
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground w-1/12">
                    {product.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell className="w-1/12">
                    <div className="h-12 w-12 rounded overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium w-1/4">{product.name}</TableCell>
                  <TableCell className="w-1/6">{product.category}</TableCell>
                  <TableCell className="text-right w-1/6">${parseFloat(product.price.toString()).toFixed(2)}</TableCell>
                  <TableCell className="w-1/6">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => openEditForm(product)}>
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="outline" 
                        size="icon" 
                        className="text-destructive" 
                        onClick={() => confirmDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <ProductForm 
            product={selectedProduct || undefined} 
            onSuccess={handleFormSuccess}
            onCancel={closeForm}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product 
              and remove it from the inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;
