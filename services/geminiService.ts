
import { TASKS } from '../constants';
import { SimulationResult, Task } from '../types';

export const runSimulation = (taskId: string, model: string, prompt: string, image?: File): Promise<SimulationResult> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const task = TASKS.find(t => t.id === taskId);
      if (!task) {
        resolve({
          output: 'Error: Task not found.',
          evaluation: 'Could not find the selected task.',
          success: false,
          modelFeedback: '',
          promptFeedback: '',
        });
        return;
      }

      const lowerCasePrompt = prompt.toLowerCase();
      
      const isModelCorrect = model === task.solution.idealModel;
      const hasRightKeywords = task.solution.promptKeywords.some(keyword => lowerCasePrompt.includes(keyword));
      const hasImageForVision = task.type === 'vision' ? !!image : true;

      const success = isModelCorrect && hasRightKeywords && hasImageForVision;

      const modelFeedback = isModelCorrect
        ? 'Excellent model choice for this task.'
        : `The model '${model}' might not be the best fit. For this task, '${task.solution.idealModel}' is recommended for optimal results.`;

      let promptFeedback = '';
      if (!hasImageForVision) {
          promptFeedback = 'This is a vision task, but no image was provided. Please upload an image.';
      } else if (hasRightKeywords) {
          promptFeedback = 'Your prompt is well-aligned with the task requirements.';
      } else {
          promptFeedback = `Your prompt could be improved. Consider using keywords like: ${task.solution.promptKeywords.slice(0, 2).join(', ')}.`;
      }
      
      const evaluation = success
        ? 'Great job! Your choices were effective for this task.'
        : 'There is room for improvement. Review the feedback below to refine your approach.';
        
      const output = success ? task.mockSuccessOutput : task.mockFailureOutput;

      resolve({
        output,
        evaluation,
        success,
        modelFeedback,
        promptFeedback,
      });

    }, 1500); // Simulate network delay
  });
};
