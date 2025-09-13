import { Server, Socket } from "socket.io";


export function initVoteSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);
  });
}
