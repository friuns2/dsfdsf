
import React from 'react';
import { Hotel } from '../types';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="p-6 flex-grow">
        <a href={hotel.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            <h2 className="text-2xl font-bold mb-2 truncate">{hotel.title}</h2>
        </a>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 truncate">{hotel.address}</p>
        <div className="flex items-center mb-4">
          <StarRating rating={hotel.rating} />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
            {hotel.rating.toFixed(1)} stars ({hotel.reviewsCount} reviews)
          </span>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            Recent Reviews
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {hotel.reviews && hotel.reviews.length > 0 ? (
              hotel.reviews.map((review, index) => <ReviewCard key={index} review={review} />)
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No reviews available for this hotel.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
