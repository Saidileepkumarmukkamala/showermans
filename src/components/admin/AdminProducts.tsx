
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
import { Pencil, Trash2, Plus } from 'lucide-react';
import { products as dummyProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [products, setProducts] = useState(dummyProducts);
  
  // This is a placeholder. In the full implementation, 
  // we would fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      // When Supabase is set up, we'll fetch products from the database
      // const { data, error } = await supabase
      //   .from('products')
      //   .select('*');
      
      // if (error) {
      //   toast.error('Failed to fetch products');
      //   return;
      // }
      
      // setProducts(data || []);
      
      // For now, we'll use dummy data
      setProducts(dummyProducts);
    };
    
    fetchProducts();
  }, []);

  const handleEditProduct = (id: number) => {
    // This will be implemented when we have the edit form
    console.log('Edit product:', id);
    toast.info('Edit product functionality will be implemented soon');
  };
  
  const handleDeleteProduct = (id: number) => {
    // This is a placeholder. In the full implementation, 
    // we would delete the product from Supabase
    console.log('Delete product:', id);
    
    // For now, we'll just filter the products list
    setProducts(products.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
  };
  
  const handleAddProduct = () => {
    // This will be implemented when we have the add form
    console.log('Add new product');
    toast.info('Add product functionality will be implemented soon');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Products Management</h2>
        <Button onClick={handleAddProduct} className="flex items-center gap-2">
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
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <div className="h-12 w-12 rounded overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditProduct(product.id)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 size={16} />
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

export default AdminProducts;
