import { StreamChat } from 'stream-chat';

export enum ChatEvents {
  connectedUser = 'connected-user',
}

interface IConnectUserParams {
  userId: string;
  name: string;
  chatToken?: string;
}

const STREAM_CHAT_INSTANCE = 'mnac4zfhsxbr';


class StreamChatService {
  private client: StreamChat | null = null;
  private connectPromise: Promise<StreamChat> | null = null;

  private connect = async (params: IConnectUserParams) => {
    console.log('*********** Init stream chat ***********');

    if (!this.client) {
      this.client = StreamChat.getInstance(STREAM_CHAT_INSTANCE);
    }

    await this.connectUser(params);

    return this.client;
  };

  public connectUser = async ({ userId, name, chatToken }: IConnectUserParams) => {
    try {
      if (!this.client) {
        throw new Error('NO CLIENT');
      }

      const connectedUser = await this.client.connectUser(
        {
          id: userId,
          name,
        },
        chatToken
      );

      if (!connectedUser) {
        throw new Error('NO_USER_CONNECTED');
      }

      // TODO: handle connect completed
    } catch (error) {
      console.log('[FAILED STREAM CHAT]', error);
    }
  };

  public init = async (params: IConnectUserParams) => {
    if (!this.connectPromise) {
      this.connectPromise = this.connect(params);
    }

    const client = await this.connectPromise;

    return client;
  };

  public getChannelById = (channelId: string) => {
    try {
      if (!this.client) {
        throw new Error('NO CLIENT');
      }

      return this.client.getChannelById('messaging', channelId, {});
    } catch (error) {
      return undefined;
    }
  };

  public fetchChannelByUserId = async () => {
    if (!this.client) {
      throw new Error('NO CLIENT');
    }

    const filter = { type: 'messaging', members: { $in: [this.client.userID || ''] } };

    const channels = await this.client.queryChannels(
      filter,
      { last_message_at: -1 },
      {
        watch: true, // this is the default
        state: true,
      }
    );

    return channels;
  };

  public sendMessage = async (channelId: string, text?: string) => {
    if (!this.client) {
      throw new Error('NO CLIENT');
    }

    const channel = this.getChannelById(channelId);

    channel?.sendMessage({
      text,
    });
  };
}

export default new StreamChatService();
