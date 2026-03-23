import express from "express"
import { pool } from "../db/client";
import pipelineRoutes from "./routes/pipelineRoutes";import { subscribe } from "diagnostics_channel";
import subscriberRoutes from "./routes/subscriberRoutes";
import webhookRoutes from "./routes/webhookRoutes";
import { startWorker } from "../workers/jobWorker";
import jobRoutes from "./routes/jobRoutes";
const app = express()

const PORT = 3000
app.use(express.json())
app.use("/api",pipelineRoutes);
app.use("/api",subscriberRoutes);
app.use("/api",webhookRoutes);
app.use("/api", jobRoutes);
app.get("/", (req, res) => {
  res.send("Webhook Pipeline Service Running")
})

//database connection test
pool.query("SELECT NOW()")
  .then(res => console.log("DB connected:", res.rows[0]))
  .catch(err => console.error("DB connection error", err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
startWorker();