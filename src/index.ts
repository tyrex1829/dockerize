import { PrismaClient } from "@prisma/client";
import express from "express";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const client = new PrismaClient();

app.get("/", (req, res) => {
  res.json({
    message: "Healthy server",
  });
});

app.post("/", async (req, res) => {
  await client.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });

  res.json({
    message: "Done signing up!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
