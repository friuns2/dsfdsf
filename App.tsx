
import React, { useState, useCallback, useEffect } from 'react';
import { Task, SimulationResult } from './types';
import { TASKS } from './constants';
import { runSimulation } from './services/geminiService';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import Workspace from './components/Workspace';
import OutputConsole from './components/OutputConsole';

const App: React.FC = () => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Select the first task by default on load
    if (TASKS.length > 0) {
      setCurrentTask(TASKS[0]);
    }
  }, []);

  const handleSelectTask = useCallback((task: Task) => {
    setCurrentTask(task);
    setSimulationResult(null);
    setIsLoading(false);
  }, []);

  const handleRunSimulation = useCallback(async (model: string, prompt: string, image?: File) => {
    if (!currentTask) return;

    setIsLoading(true);
    setSimulationResult(null);

    const result = await runSimulation(currentTask.id, model, prompt, image);
    
    setSimulationResult(result);
    setIsLoading(false);
  }, [currentTask]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
          <TaskBoard tasks={TASKS} onSelectTask={handleSelectTask} activeTaskId={currentTask?.id} />
        </div>
        <div className="flex-grow flex flex-col md:flex-row gap-4 overflow-hidden h-full md:w-3/4 lg:w-4/5">
          <div className="w-full md:w-1/2 flex flex-col">
            <Workspace task={currentTask} onRunSimulation={handleRunSimulation} isLoading={isLoading} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <OutputConsole result={simulationResult} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
