
import React, { useState, useEffect, useCallback } from 'react';
import { Task, TaskType } from '../types';
import { MODELS } from '../constants';
import { LightBulbIcon } from './icons/LightBulbIcon';

interface WorkspaceProps {
  task: Task | null;
  onRunSimulation: (model: string, prompt: string, image?: File) => void;
  isLoading: boolean;
}

const Workspace: React.FC<WorkspaceProps> = ({ task, onRunSimulation, isLoading }) => {
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0]?.id || '');
  const [prompt, setPrompt] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setPrompt('');
      setImageFile(null);
      setImagePreview(null);
      // set a default model based on task type
      if (task.type === TaskType.VISION) {
          setSelectedModel('gemini-2.5-flash-image');
      } else if(task.id === 'task-4') { // special case for advanced task
          setSelectedModel('gemini-2.5-pro');
      } else {
          setSelectedModel('gemini-2.5-flash');
      }
    }
  }, [task]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunSimulation(selectedModel, prompt, imageFile || undefined);
  };

  if (!task) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center h-full">
        <p className="text-gray-400">Select a task from the board to begin.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col h-full shadow-inner">
      <h2 className="text-xl font-bold mb-2 text-white">{task.title}</h2>
      <div className="bg-gray-900 rounded-md p-4 mb-4 whitespace-pre-wrap text-gray-300 text-sm flex-shrink-0 overflow-y-auto max-h-48 border border-gray-700">
        {task.description}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
        <div>
          <label htmlFor="model-select" className="block text-sm font-medium text-gray-400 mb-1">
            Choose a Model
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
          >
            {MODELS.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>

        {task.type === TaskType.VISION && (
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-400 mb-1">
              Upload Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-md max-h-24 object-contain" />}
          </div>
        )}
        
        <div className="flex-grow flex flex-col">
          <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-400 mb-1">
            Your Prompt
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your instructions for the AI model..."
            className="w-full flex-grow bg-gray-700 border border-gray-600 rounded-md p-3 text-white font-fira-code text-sm resize-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running Simulation...
            </>
          ) : (
            'Run Simulation'
          )}
        </button>
      </form>
    </div>
  );
};

export default Workspace;
