import express, { static as static_ } from "express";
import http from "node:http";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";
import { Server } from "socket.io";

config();
const APP = express(),
  server = http.createServer(APP),
  io = new Server(server, { cors: { origin: "*" } }),
  __dirname = dirname(fileURLToPath(import.meta.url)),
  PORT = process.env.PORT || 5200;

APP.use(static_(join(__dirname, "../client/dist")));

io.on("connection", function (socket) {
  socket.broadcast.emit("message", {
    userName: "INFO",
    message: "Usuario conectado",
  });

  socket.on("message", data => io.emit("message", data));

  socket.on("online_user", data => io.emit("online_user", data));

  socket.on("writing", data => socket.broadcast.emit("writing", data));

  socket.on("stop_writing", () => socket.emit("stop_writing", ""));

  //Captura todos los eventos entrantes.
  socket.onAny(function (eventName, ...args) {
    console.log("Eventos entrantes");
    console.log("Envent: ", eventName);
    console.log("Args: ", args);
  });

  //Captura todos los eventos salientes.
  socket.onAnyOutgoing(function (eventName, ...args) {
    console.log("Eventos salientes");
    console.log("Envent: ", eventName);
    console.log("Args: ", args);
  });
});

server.listen(PORT, () => console.log(`Listen on port ${PORT}`));
