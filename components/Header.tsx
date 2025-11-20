
import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 flex items-center shadow-lg sticky top-0 z-10">
      <CodeIcon className="w-8 h-8 text-cyan-400 mr-3" />
      <h1 className="text-2xl font-bold text-white tracking-wider">
        AI Engineer Job Simulator
      </h1>
    </header>
  );
};

export default Header;
