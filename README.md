# Water Jug Problem Solver API
This API provides a solution to the classic water jug problem. Given two jugs of specified capacities and a target amount of water, the API returns the steps required to measure the exact amount using the two jugs.

## Endpoint
``POST /api/v1/waterjug/solve``

Accepts JSON data with the capacities of two jugs and the target amount of water to measure. It returns a sequence of steps, if possible, to achieve the target amount.

### Request Parameters
The endpoint expects the following parameters in the JSON body:

- x: Capacity of Jug A (integer, must be greater than 0)
- y: Capacity of Jug B (integer, must be greater than 0)
- z: Target amount of water to measure (integer, must be between 0 and the maximum of x or y)


Example request body:
 ```sh
{
  "x": 5,
  "y": 3,
  "z": 4
}
 ```

## Response

- Success (200): Returns a JSON object with an array of steps detailing how to achieve the desired amount of water.
```sh
{
  "steps": [
    "Fill jug A (A: 5, B: 0)",
    "Transfer jug A into B (A: 2, B: 3)",
    "Empty jug B (A: 2, B: 0)",
    "Transfer jug A into B (A: 0, B: 2)",
    "Fill jug A (A: 5, B: 2)",
    "Transfer jug A into B (A: 4, B: 3)"
  ]
}
 ```

- Error (400): Returns an error message if the parameters are invalid or if there's no solution

```sh 
{
  "error": "Invalid parameters"
}

 ```

or

```sh 
{
  "error": "No solution"
}
 ```

## Implementation Details

The main function solve:

1. Validates Input: Ensures the capacities and target are positive integers and within a valid range.
2. Breadth-First Search (BFS) Algorithm: Uses BFS to find the shortest sequence of operations to measure the target amount.
3. Tracks Visited States: Uses a set to keep track of visited states and avoid infinite loops.
4. Returns Solution: If a solution is found, returns the steps; otherwise, returns an error indicating no solution.

## Usage

To use this function within an Express server:

### 1.Import the function:

``import { solve } from './path-to-solve-function';``

### Use it as a route handler in your Express app:

``app.post('/api/v1/waterjug/solve', solve);``

## Code Structure

### 1. Input Validation:

- The algorithm begins by checking that the jug capacities (x and y) and the desired amount (z) are valid.
- It verifies that x and y are greater than zero, and that z is greater than or equal to zero and does not exceed the capacity of the largest jug (Math.max(x, y)).
- It confirms that x, y, and z are integers. If any of these parameters are invalid, it returns a 400 error with a message of "Invalid parameters."

### 2.Search Algorithm (BFS):

- The ``solveWaterJug`` function is defined to carry out the search and find the necessary steps.

### Initialization:

- A set (visited) is created to store already explored states and avoid revisiting the same states.
- A queue (queue) is initialized with the initial state of the jugs ``(a = 0, b = 0)``, and an empty list of steps.

#### 1. Fill a jug: A can be filled completely (a = x) or B can be filled completely (b = y).
#### 2. Empty a jug: A can be emptied (a = 0) or B can be emptied (b = 0).
#### 3. Transfer between jugs:

   - Transfer from A to B: Pour the maximum amount from A to B until B is full or A is empty.
   - Transfer from B to A: Pour the maximum amount from B to A until A is full or B is empty.

- Each action generates a new state and describes the action taken.

### Success Check:

- After each action, the algorithm checks if the desired amount ``(z)`` has been reached in either jug ``(a or b)``.
- If ``z`` is found in one of the jugs, it returns the sequence of steps that led to this state.

### Avoid Repeated States:

- To avoid cycles and revisiting already explored states, the code stores visited states in ``visited``. If a new state has not been visited before, it is added to the queue for further exploration.

### Algorithm Result:

- If the steps are found, the sequence is returned as a JSON object.
- If no solution is found after exploring all possible states, the algorithm responds with a 400 error and a message of "No solution."

## Example of How It Works


  
