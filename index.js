import express from "express";
import cors from "cors";
import solveRouter from "./src/routes/route.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/waterjug", solveRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
