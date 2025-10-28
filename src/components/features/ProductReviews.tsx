import { useState } from 'react';
import { reviewService } from '@/services';
import type { Review } from '@/types';
import { Button, Card } from '@/components/common';

interface ProductReviewsProps {
  productId: string;
  initialReviews?: Review[];
}

export const ProductReviews = ({ productId, initialReviews = [] }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await reviewService.createReview(productId, newReview);
      setReviews([...reviews, response]);
      setNewReview({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reseñas del Producto</h2>
      
      {/* Formulario de nueva reseña */}
      <Card>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Calificación
            </label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="w-full p-2 border rounded"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} estrellas
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Comentario
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Escribe tu reseña aquí..."
            />
          </div>

          <Button type="submit">
            Enviar Reseña
          </Button>
        </form>
      </Card>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                  <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;