const solve = (req, res) => {
  const { x, y, z } = req.body;

  if (x <= 0 || y <= 0 || z < 0 || z > Math.max(x, y)) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  if (
    Number.isInteger(x) === false ||
    Number.isInteger(y) === false ||
    Number.isInteger(z) === false
  ) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const solveWaterJug = (x, y, z) => {
    const visited = new Set();
    const queue = [{ a: 0, b: 0, steps: [] }];

    while (queue.length > 0) {
      const { a, b, steps } = queue.shift();

      const actions = [
        { a: x, b, action: `Fill jug A (A: ${x}, B: ${b})` },
        { a, b: y, action: `Fill jug B (A: ${a}, B: ${y})` },
        { a: 0, b, action: `Empty jug A (A: 0, B: ${b})` },
        { a, b: 0, action: `Empty jug B (A: ${a}, B: 0)` },
        {
          a: Math.max(0, a - (y - b)),
          b: Math.min(y, a + b),
          action: `Transfer jug A into B (A: ${Math.max(
            0,
            a - (y - b)
          )}, B: ${Math.min(y, a + b)})`,
        },
        {
          a: Math.min(x, a + b),
          b: Math.max(0, b - (x - a)),
          action: `Transfer jug B into A (A: ${Math.min(
            x,
            a + b
          )}, B: ${Math.max(0, b - (x - a))})`,
        },
      ];

      for (const next of actions) {
        if (next.a === z || next.b === z) {
          const finalSteps = [...steps, next.action];
          return finalSteps;
        }

        const newState = `${next.a},${next.b}`;
        if (!visited.has(newState)) {
          visited.add(newState);
          queue.push({ a: next.a, b: next.b, steps: [...steps, next.action] });
        }
      }
    }

    return null;
  };

  const result = solveWaterJug(x, y, z);
  if (result) {
    res.json({ steps: result });
  } else {
    res.status(400).json({ error: "No solution" });
  }
};

export { solve };
