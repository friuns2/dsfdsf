
export enum TaskType {
  TEXT = 'text',
  VISION = 'vision',
  JSON = 'json',
}

export interface Solution {
  idealModel: string;
  promptKeywords: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  solution: Solution;
  mockSuccessOutput: string | object;
  mockFailureOutput: string;
}

export interface SimulationResult {
  output: string | object;
  evaluation: string;
  success: boolean;
  modelFeedback: string;
  promptFeedback: string;
}
