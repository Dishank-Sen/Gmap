"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app); // ✅ Attach server manually
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Adjust in production
    },
});
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
// ✅ Just to verify HTTP is working
app.get("/", (_req, res) => {
    res.send(`Server running on port ${PORT}`);
});
// ✅ Socket.IO connection handler
io.on("connection", (socket) => {
    console.log(`🔌 New WebSocket connection on port ${PORT}`);
    socket.on("disconnect", () => {
        console.log(`❌ WebSocket disconnected on port ${PORT}`);
    });
});
// ✅ Start server
server.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
