import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

type ProductFormProps = {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
};

type FormValues = {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

const CATEGORIES = ["Whiskey", "Vodka", "Gin", "Wine", "Champagne", "Tequila", "Rum", "Cognac"];

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price?.toString() || '',
      category: product?.category || '',
      image: product?.image || '',
    }
  });

  const selectedCategory = watch('category');

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue('image', url); // Temporarily set for validation
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);

      let imageUrl = product?.image || '';

      // Upload the image if a new one was selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `products/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const productData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      };

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) throw error;

        // Create inventory entry for the new product
        if (newProduct) {
          const { error: inventoryError } = await supabase
            .from('inventory')
            .insert([{
              product_id: newProduct.id,
              in_stock: 0
            }]);

          if (inventoryError) throw inventoryError;
        }
        
        toast.success('Product created successfully');
      }

      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Product name is required" })}
              placeholder="Enter product name"
              className="mt-1"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              {...register("price", {
                required: "Price is required",
                validate: value => parseFloat(value) > 0 || "Price must be greater than 0"
              })}
              placeholder="0.00"
              className="mt-1"
            />
            {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setValue('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register("category", { required: "Category is required" })} value={selectedCategory} />
            {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter product description"
              className="mt-1"
              rows={5}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="image">Product Image</Label>
            <div className="mt-1 border border-input rounded-md p-4">
              {imagePreview ? (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-64 w-full object-contain rounded"
                  />
                </div>
              ) : (
                <div className="h-64 w-full bg-muted/30 flex items-center justify-center rounded mb-4">
                  <span className="text-muted-foreground">No image selected</span>
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {/* Keep the original image URL in a hidden field if needed */}
              <input 
                type="hidden" 
                {...register("image")} 
                value={product?.image || ''} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
