import express, { Request, Response } from "express";
import cors from "cors";
import crackSafe from "./features/crackSafe.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));
app.use(express.json()); // Add this to parse JSON request bodies

app.get("/api", (req: Request, res: Response) => {
  res.json({ "fruits": ["apple", "orange", "banana"] });
});

app.post("/api/crack_safe/", (req: Request, res: Response) => {
  res.json(crackSafe(req.body.actual_combination));
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});