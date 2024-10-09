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





