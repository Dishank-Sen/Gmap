import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import cors from "cors";

const app = express();
// Allow specific origin
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8080"],
  credentials: true
}));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true
  }
});


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});


// Create Redis clients
const pubClient = createClient();
const subClient = pubClient.duplicate();

async function setup() {
  await pubClient.connect();
  await subClient.connect();

  // Subscribe to Redis channel and forward messages via WebSocket
  await subClient.subscribe("chat", (message: string) => {
    io.emit("chat", message);
  });

  // Handle WebSocket connections
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("chat", (message: string) => {
      // Publish chat message to Redis
      pubClient.publish("chat", message);
    });

    socket.on("test", ({message}) => {
      console.log(message)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  server.listen(PORT , "0.0.0.0" ,() => {
    console.log("WebSocket + Redis server listening on port ",PORT);
  });
}


setup().catch((err) => {
  console.error("Failed to set up server:", err);
});