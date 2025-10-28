import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '@/services';
import type { Order } from '@/types';
import { Card } from '@/components/common';

export const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const data = await orderService.getOrderDetails(orderId);
          setOrder(data);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Cargando detalles del pedido...</div>;
  }

  if (!order) {
    return <div>No se encontró el pedido</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Detalles del Pedido #{order.id}</h1>
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Estado del Pedido</h2>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {order.status}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Productos</h2>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between border-b pb-2">
                  <span>{item.name}</span>
                  <div>
                    <span className="mr-4">Cantidad: {item.quantity}</span>
                    <span>Precio: ${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Dirección de Envío</h2>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div className="border-t pt-4">
            <div className="text-xl font-bold flex justify-between">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetails;