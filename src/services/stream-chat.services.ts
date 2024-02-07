import { StreamChat } from 'stream-chat';

export enum ChatEvents {
  connectedUser = 'connected-user',
}

class StreamChatService {
  static _instance: StreamChatService;
  private STREAM_CHAT_INSTANCE = 'mnac4zfhsxbr';

  static getInstance() {
    if (!StreamChatService._instance) {
      StreamChatService._instance = new StreamChatService();
    }
    return StreamChatService._instance;
  }

  constructor(private _client = StreamChat.getInstance('mnac4zfhsxbr')) {}

  async registerPushToken() {}

  init = async (params: {
    userId: string;
    name: string;
    chatToken?: string;
  }) => {
    const { name, userId, chatToken } = params;
    console.log('*********** Init stream chat ***********');
    if (!this._client) {
      this._client = StreamChat.getInstance(this.STREAM_CHAT_INSTANCE);
    }

    try {
      const connectedUser = await this._client.connectUser(
        {
          id: userId,
          name,
        },
        chatToken
      );
      if (connectedUser) {
        // TODO: handle connect completed
      } else {
        // TODO: handle error
      }
    } catch (error) {
      // TODO: handle error
    }

    return this._client;
  };

  get client() {
    return this._client;
  }

  getChannelById = async (channelId: string) => {
    try {
      return this._client.getChannelById('messaging', channelId, {});
    } catch (error) {
      return undefined;
    }
  };

  fetchChannelByUserId = async () => {
    const filter = { type: 'messaging', members: { $in: ['demo3'] } };

    const channels = await this._client.queryChannels(
      filter,
      { last_message_at: -1 },
      {
        watch: true, // this is the default
        state: true,
      }
    );
    return channels;
  };

  sendMessage = async (channelId: string, text?: string) => {
    const channel = await this._client.getChannelById(
      'messaging',
      channelId,
      {}
    );

    channel.sendMessage({
      text,
    });
  };
}

export default StreamChatService.getInstance();
