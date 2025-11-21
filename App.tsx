
import React, { useState, useCallback } from 'react';
import { Hotel } from './types';
import { fetchHotelReviews } from './services/apifyService';
import Header from './components/Header';
import HotelCard from './components/HotelCard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setHotels([]);
    try {
      const results = await fetchHotelReviews(setLoadingMessage);
      setHotels(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Click the button below to start scraping Google Maps for hotel reviews in Danang, Vietnam using the Apify platform.
          </p>
        </div>
        
        {!isLoading && hotels.length === 0 && (
          <div className="flex justify-center my-8">
            <button
              onClick={handleFetchData}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              disabled={isLoading}
            >
              Fetch Hotel Reviews
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <LoadingSpinner />
            <p className="mt-4 text-xl font-semibold text-blue-600 dark:text-blue-400">{loadingMessage}</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Please be patient, this process can take several minutes.</p>
          </div>
        )}

        {error && (
            <div className="text-center my-8 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
                <p className="font-bold">An Error Occurred</p>
                <p>{error}</p>
                <button
                    onClick={handleFetchData}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
                >
                    Try Again
                </button>
            </div>
        )}

        {!isLoading && hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
              <HotelCard key={`${hotel.id}-${index}`} hotel={hotel} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
