
import { Task, TaskType } from './types';

export const MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Text, JSON)' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (Complex Text)' },
  { id: 'gemini-2.5-flash-image', name: 'Gemini 2.5 Flash Image (Vision)' },
  { id: 'imagen-4.0-generate-001', name: 'Imagen 4.0 (Image Generation)'},
];

export const TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Summarize Tech Article',
    description: "From: Product Manager\n\nHi Engineer,\nWe have a long-form tech article about quantum computing. We need a concise, three-sentence summary for our newsletter. Please generate it. This is a standard text task, so a fast and efficient model should work.",
    type: TaskType.TEXT,
    solution: {
      idealModel: 'gemini-2.5-flash',
      promptKeywords: ['summarize', 'concise', 'three sentences', '3 sentences'],
    },
    mockSuccessOutput: 'Quantum computing utilizes quantum-mechanical phenomena, such as superposition and entanglement, to perform calculations. Unlike classical computers that use bits, quantum computers use qubits, which can represent both 0 and 1 simultaneously. This capability promises to solve complex problems intractable for classical computers in fields like medicine and materials science.',
    mockFailureOutput: 'Error: The model failed to generate a summary. Please check your prompt and model selection.'
  },
  {
    id: 'task-2',
    title: 'Analyze Customer Feedback',
    description: "From: Support Lead\n\nHey,\nWe received a screenshot of a customer's feedback from social media. Can you analyze the image to identify the main sentiment (positive, negative, neutral) and extract the key issues mentioned? We need to understand what the customer is saying without manually re-typing it.",
    type: TaskType.VISION,
    solution: {
      idealModel: 'gemini-2.5-flash-image',
      promptKeywords: ['sentiment', 'extract', 'issues', 'image', 'feedback', 'what does this say'],
    },
    mockSuccessOutput: 'Image analysis complete.\n\nSentiment: Negative\n\nKey Issues:\n1. The app is crashing on startup.\n2. User lost their unsaved work.\n3. They are unable to contact support through the app.',
    mockFailureOutput: 'Error: Image could not be analyzed. Please ensure you are using a vision-capable model like Gemini 2.5 Flash Image.'
  },
  {
    id: 'task-3',
    title: 'Generate User Profile JSON',
    description: "From: Backend Dev\n\nUrgent!\nI need to create a sample user object for testing the new sign-up flow. Please provide a JSON object based on the following unstructured text: 'The user is Jane Doe, email is jane.doe@example.com, she is 32 years old and lives in New York. Her user ID should be a random 8-digit number.' Make sure the output is valid JSON.",
    type: TaskType.JSON,
    solution: {
      idealModel: 'gemini-2.5-flash',
      promptKeywords: ['json', 'object', 'user', 'jane doe'],
    },
    mockSuccessOutput: {
        "userId": 84620173,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 32,
        "city": "New York"
    },
    mockFailureOutput: 'Error: Failed to generate valid JSON. Check your prompt for instructions on the format.'
  },
  {
    id: 'task-4',
    title: 'Advanced Code Generation',
    description: "From: Senior Architect\n\nWe need a Python function that uses memoization to efficiently calculate Fibonacci numbers. This requires some reasoning about recursion and caching. Please use one of our more powerful models to ensure the logic is sound and the code is well-commented.",
    type: TaskType.TEXT,
    solution: {
      idealModel: 'gemini-2.5-pro',
      promptKeywords: ['python', 'fibonacci', 'memoization', 'cache', 'recursion', 'function'],
    },
    mockSuccessOutput: "```python\n# A dictionary to store computed Fibonacci values (cache)\nmemo = {}\n\ndef fibonacci_memo(n):\n    \"\"\"\n    Calculates the nth Fibonacci number using memoization to optimize performance.\n    \"\"\"\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    \n    # Recursively compute and store the result\n    result = fibonacci_memo(n - 1) + fibonacci_memo(n - 2)\n    memo[n] = result\n    return result\n\n# Example usage:\nprint(fibonacci_memo(10)) # Output: 55\nprint(fibonacci_memo(35)) # Output: 9227465\n```",
    mockFailureOutput: 'Error: Failed to generate code. This is a complex task; consider using a more advanced model like Gemini 2.5 Pro.'
  }
];
