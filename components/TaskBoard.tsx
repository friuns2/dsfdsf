
import React from 'react';
import { Task } from '../types';

interface TaskBoardProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  activeTaskId?: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onSelectTask, activeTaskId }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full flex flex-col shadow-inner">
      <h2 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-2">Task Board</h2>
      <div className="flex-grow overflow-y-auto pr-2">
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <button
                onClick={() => onSelectTask(task)}
                className={`w-full text-left p-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  activeTaskId === task.id
                    ? 'bg-cyan-600 text-white font-semibold shadow-md'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {task.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskBoard;
