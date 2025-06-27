import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
//Create Express app and http server

const app = express();
const server = http.createServer(app);

//Initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//Store online users
export const userSocketMap = {}; //{userId: socketId}

//Socket.io connection Handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected ", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
//connect to mongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
