
import React, { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

// Sample order data
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: { productId: number; name: string; quantity: number; price: number }[];
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phoneNumber?: string;
};

const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    date: '2023-05-15',
    total: 345.98,
    status: 'pending',
    items: [
      { productId: 1, name: 'Macallan 18 Years', quantity: 1, price: 299.99 },
      { productId: 3, name: 'Hendrick\'s Gin', quantity: 1, price: 39.99 }
    ],
    shippingAddress: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    phoneNumber: '+1 (555) 123-4567'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    date: '2023-05-16',
    total: 79.99,
    status: 'processing',
    items: [
      { productId: 8, name: 'Monkey 47', quantity: 1, price: 79.99 }
    ],
    shippingAddress: {
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    phoneNumber: '+1 (555) 987-6543'
  },
  {
    id: 'ORD-003',
    customerName: 'Robert Johnson',
    customerEmail: 'robert@example.com',
    date: '2023-05-14',
    total: 229.97,
    status: 'shipped',
    items: [
      { productId: 9, name: 'Jack Daniel\'s Old No. 7', quantity: 3, price: 29.99 },
      { productId: 10, name: 'Belvedere Vodka', quantity: 2, price: 32.99 },
      { productId: 14, name: 'Bombay Sapphire', quantity: 2, price: 24.99 }
    ],
    shippingAddress: {
      address: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zip: '60007',
      country: 'USA'
    },
    phoneNumber: '+1 (555) 456-7890'
  }
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
    }
  };
  
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };
  
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status } : null);
    }
    
    toast.success(`Order ${orderId} marked as ${status}`);
  };
  
  const sendNotification = (order: Order) => {
    // This would integrate with an email/SMS service
    toast.success(`Notification sent to ${order.customerName}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-medium">Orders Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Recent orders</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => viewOrderDetails(order)}>
                        <Eye size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="md:col-span-1">
          {selectedOrder ? (
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Order Details</h3>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Customer Information</h4>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p>{selectedOrder.customerEmail}</p>
                  <p>{selectedOrder.phoneNumber || 'No phone number'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Items</h4>
                  <ul className="space-y-2 mt-2">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Actions</h4>
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                        disabled={selectedOrder.status === 'processing'}
                      >
                        Mark Processing
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                        disabled={selectedOrder.status === 'shipped'}
                      >
                        Mark Shipped
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full flex items-center gap-1"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                        disabled={selectedOrder.status === 'delivered'}
                      >
                        <CheckCircle size={14} />
                        Delivered
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full flex items-center gap-1 text-destructive"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                        disabled={selectedOrder.status === 'cancelled' || selectedOrder.status === 'delivered'}
                      >
                        <XCircle size={14} />
                        Cancel
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => sendNotification(selectedOrder)}
                    >
                      Send Notification
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border rounded-md p-6 flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center">
                Select an order to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
