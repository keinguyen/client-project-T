export interface ClientToServerEvents {
  joinConversation: (roomId: number) => void;
}

export interface ServerToClientEvents {
  joinConversation: (data: { streamName: string; accountId: string }) => void;
}
