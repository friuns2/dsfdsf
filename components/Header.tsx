
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-4">
          <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Danang Hotel Reviews</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Apify & Google Maps Scraper</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
