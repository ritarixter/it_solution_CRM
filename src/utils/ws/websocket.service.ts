import { Socket, io } from "socket.io-client";
import { AppDispatch } from "../../services/store";
import {
  setConnected,
  setError,
  setMessage,
} from "../../services/slices/socket";

export class WebSocketService {
  private socket: Socket | null = null;
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  connect() {
    this.socket = io("http://localhost:8001"); // замените на ваш адрес сервера

    this.socket.on("connect", () => {
      this.dispatch(setConnected(true));
    });

    this.socket.on("message", (data: string) => {
      this.dispatch(setMessage(data));
    });

    this.socket.on("disconnect", () => {
      this.dispatch(setConnected(false));
    });

    this.socket.on("error", (error) => {
      this.dispatch(setError(false));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(message: string) {
    if (this.socket) {
      this.socket.emit("message", message);
    }
  }
}


