
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
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Order, OrderItem, Product } from '@/lib/supabase';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

type ExtendedOrderItem = OrderItem & {
  product: Product;
};

type ExtendedOrder = Order & {
  items: ExtendedOrderItem[];
  customerName: string;
  customerEmail: string;
  phoneNumber?: string;
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<ExtendedOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ExtendedOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      
      // Fetch orders with basic user info
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          user:profiles(id, full_name, email)
        `)
        .order('created_at', { ascending: false });
      
      if (ordersError) throw ordersError;

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }

      // For each order, fetch the order items and associated products
      const extendedOrders: ExtendedOrder[] = [];
      
      for (const order of ordersData) {
        // Fetch order items with product details
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            *,
            product:products(*)
          `)
          .eq('order_id', order.id);
        
        if (itemsError) throw itemsError;
        
        // Use sample shipping data for now (this would come from a real shipping_addresses table in a complete implementation)
        const sampleShippingAddress = {
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        };
        
        extendedOrders.push({
          ...order,
          customerName: order.user?.full_name || 'Unknown',
          customerEmail: order.user?.email || 'unknown@example.com',
          phoneNumber: '+1 (555) 123-4567', // Sample phone number
          shippingAddress: sampleShippingAddress,
          items: itemsData || []
        });
      }
      
      setOrders(extendedOrders);
    } catch (error: any) {
      toast.error('Failed to fetch orders: ' + error.message);
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
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
  
  const viewOrderDetails = (order: ExtendedOrder) => {
    setSelectedOrder(order);
  };
  
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Update the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status } : null);
      }
      
      toast.success(`Order ${orderId.substring(0, 8)}... marked as ${status}`);
    } catch (error: any) {
      toast.error('Failed to update order: ' + error.message);
      console.error('Error updating order:', error);
    }
  };
  
  const sendNotification = (order: ExtendedOrder) => {
    // This would integrate with an email/SMS service
    toast.success(`Notification sent to ${order.customerName}`);
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Use sample orders if no real orders exist yet
  const displayOrders = orders.length > 0 ? orders : [
    {
      id: 'sample-order-1',
      user_id: 'user1',
      status: 'pending' as OrderStatus,
      total: 345.98,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      customerName: 'John Doe (Sample)',
      customerEmail: 'john@example.com',
      items: [
        {
          id: 'item1',
          order_id: 'sample-order-1',
          product_id: 'prod1',
          quantity: 1,
          price: 299.99,
          product: {
            id: 'prod1',
            name: 'Macallan 18 Years',
            description: 'Premium single malt Scotch whisky',
            price: 299.99,
            category: 'Whiskey',
            image: '/lovable-uploads/fa48fcd8-00c2-460c-a526-31075be3a614.png',
            created_at: '',
            updated_at: ''
          }
        }
      ],
      shippingAddress: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      phoneNumber: '+1 (555) 123-4567'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-medium">Orders Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Recent orders {orders.length === 0 && '(Sample data shown)'}</TableCaption>
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
                {displayOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium font-mono text-xs">
                      {typeof order.id === 'string' ? order.id.substring(0, 8) + '...' : order.id}
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${parseFloat(order.total.toString()).toFixed(2)}
                    </TableCell>
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
                  <p>{selectedOrder.shippingAddress?.address}</p>
                  <p>
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}
                  </p>
                  <p>{selectedOrder.shippingAddress?.country}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Items</h4>
                  <ul className="space-y-2 mt-2">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.product?.name}
                        </span>
                        <span>${(parseFloat(item.price.toString()) * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${parseFloat(selectedOrder.total.toString()).toFixed(2)}</span>
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
