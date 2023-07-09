import { socket } from "../config/socketConnection";

export function sendSocketData(path, data) {
  socket.emit(path, data);
}
