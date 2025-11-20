
import React from 'react';
import { SimulationResult } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';

interface OutputConsoleProps {
  result: SimulationResult | null;
  isLoading: boolean;
}

const FeedbackItem: React.FC<{ icon: React.ReactNode; text: string; color: string }> = ({ icon, text, color }) => (
  <div className="flex items-start space-x-3">
    <div className={`flex-shrink-0 ${color}`}>{icon}</div>
    <p className="text-sm text-gray-300">{text}</p>
  </div>
);

const OutputConsole: React.FC<OutputConsoleProps> = ({ result, isLoading }) => {
  const renderOutput = () => {
    if (typeof result?.output === 'string') {
      return (
        <pre className="whitespace-pre-wrap text-sm text-gray-300 font-fira-code">
          {result.output}
        </pre>
      );
    }
    if (typeof result?.output === 'object' && result.output !== null) {
      return (
        <pre className="whitespace-pre-wrap text-sm text-gray-300 font-fira-code bg-gray-900 p-4 rounded-md border border-gray-600">
          {JSON.stringify(result.output, null, 2)}
        </pre>
      );
    }
    return null;
  };
  
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-center items-center h-full shadow-inner">
        <svg className="animate-spin h-10 w-10 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold text-gray-300">Simulating AI Response...</p>
        <p className="text-sm text-gray-500">This may take a moment.</p>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center h-full shadow-inner">
        <p className="text-gray-400 text-center">Output will appear here after running a simulation.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col h-full shadow-inner overflow-hidden">
      <h2 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-2">Console Output</h2>
      <div className="flex-grow overflow-y-auto pr-2 space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-200">Result</h3>
            <div className="bg-black/20 p-4 rounded-md border border-gray-700 min-h-[100px]">
                {renderOutput()}
            </div>
        </div>
        
        <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Evaluation</h3>
            <div className={`flex items-center p-3 rounded-md mb-4 ${result.success ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
              {result.success ? <CheckCircleIcon className="w-6 h-6 text-green-400 mr-3" /> : <XCircleIcon className="w-6 h-6 text-red-400 mr-3" />}
              <p className={`font-semibold ${result.success ? 'text-green-300' : 'text-red-300'}`}>{result.evaluation}</p>
            </div>

            <div className="space-y-3">
              <FeedbackItem 
                icon={<LightBulbIcon className="w-5 h-5 mt-0.5" />} 
                text={result.modelFeedback} 
                color={result.success ? 'text-green-400' : 'text-amber-400'} 
              />
              <FeedbackItem 
                icon={<LightBulbIcon className="w-5 h-5 mt-0.5" />} 
                text={result.promptFeedback} 
                color={result.success ? 'text-green-400' : 'text-amber-400'} 
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default OutputConsole;
