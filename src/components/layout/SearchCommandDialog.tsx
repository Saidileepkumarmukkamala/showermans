
import React from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Search } from 'lucide-react';

type SearchCommandDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SearchCommandDialog = ({ open, setOpen }: SearchCommandDialogProps) => {
  const navigate = useNavigate();

  const handleSelect = (productId: number) => {
    setOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search products..." />
      <CommandList>
        <CommandEmpty>No products found.</CommandEmpty>
        <CommandGroup heading="Products">
          {products.map((product) => (
            <CommandItem
              key={product.id}
              onSelect={() => handleSelect(product.id)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{product.name}</span>
                <span className="text-xs text-muted-foreground">${product.price.toFixed(2)}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommandDialog;
