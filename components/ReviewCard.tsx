
import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
}

const formatDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        return dateString;
    }
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">{review.reviewerName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(review.publishedAt)}</p>
          </div>
          <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
        {review.text}
      </p>
      {review.ownerResponse && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-sm text-gray-600 dark:text-gray-300">Owner's Response:</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{review.ownerResponse.text}"</p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
