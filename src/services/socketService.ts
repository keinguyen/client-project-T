import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../models/event';

class SocketService {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io('ws://appraisal-hub.onrender.com', {
      autoConnect: true,
      transports: ['websocket'],
    });

  connectWithAuthToken(token: string) {
    // this.socket.auth = { token };
    console.log('****** token ******', token);

    this.socket.connect();
  }

  isConnected() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  }

  isConnectError() {
    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  isDisconnect() {
    this.socket.on('disconnect', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  joinConversation(roomId: number) {
    this.socket.emit('joinConversation', roomId);
  }
  subscribeToJoinConversation(
    joinConversationHandler: ServerToClientEvents['joinConversation']
  ) {
    this.socket.on('joinConversation', joinConversationHandler);
  }
}

export const socketService = new SocketService();
