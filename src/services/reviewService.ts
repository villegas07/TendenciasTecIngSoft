import { API_URLS } from '../utils/constants';
import type { ReviewInput } from '../types';

export const reviewService = {
  createReview: async (productId: string, reviewData: ReviewInput) => {
    try {
      const response = await fetch(`${API_URLS.BASE_URL}${API_URLS.REVIEWS}/product/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error('Error creating review');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  getProductReviews: async (productId: string) => {
    try {
      const response = await fetch(`${API_URLS.BASE_URL}${API_URLS.REVIEWS}/product/${productId}`);
      
      if (!response.ok) {
        throw new Error('Error fetching product reviews');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      throw error;
    }
  },
};

export default reviewService;