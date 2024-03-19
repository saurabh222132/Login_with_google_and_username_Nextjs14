import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const port = 5000;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  //  options
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.of("/admin").on("connection", (socket) => {
  console.log("New Admin connected", socket.id);
});

io.on("connection", (socket) => {
  socket.on("user-message", () => {
    console.log("Data recieved on backed");
  });
  socket.on("send-message", (data) => {
    console.log(data);
    socket.broadcast
      .timeout(5000)
      .emit("send-m", { _id: socket.id, message: data.message });
  });
});

io.on("disconnection", (socket) => {
  console.log(socket.connected);
  console.log("Socket disconnected");
});

app.get("/", (req, res) => {
  const count = io.engine.clientsCount;
  res.status(200).json({ message: "Server alive", connectedCLients: count });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
