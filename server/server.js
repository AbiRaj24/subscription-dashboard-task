import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import planRoutes from "./routes/planRoutes.js";
//import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running...");
});

//app.use("/api/plans",planRoutes);
//app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
