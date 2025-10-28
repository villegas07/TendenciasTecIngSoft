import { API_URLS } from '../utils/constants';
import type { Order } from '../types';

export const orderService = {
  createOrder: async (orderData: Partial<Order>) => {
    try {
      const response = await fetch(`${API_URLS.BASE_URL}${API_URLS.ORDERS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Error creating order');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getOrderHistory: async (userId: string) => {
    try {
      const response = await fetch(`${API_URLS.BASE_URL}${API_URLS.ORDERS}/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Error fetching order history');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching order history:', error);
      throw error;
    }
  },

  getOrderDetails: async (orderId: string) => {
    try {
      const response = await fetch(`${API_URLS.BASE_URL}${API_URLS.ORDERS}/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Error fetching order details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },
};

export default orderService;