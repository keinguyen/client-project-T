import { useEffect } from 'react';
import streamChatServices from '../services/stream-chat.services';

export default function useChatListener() {
  useEffect(() => {
    streamChatServices.init(
      {
        name: 'demo3',
        userId: 'demo3',
        chatToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGVtbzMifQ.yc7lgkcmczL8Q9kVVcigJoLFwz5ILDjt0WsuQTNKxh4',
      }
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGVtbzIifQ.YFrkyrH7myrLGRgQLM2yISOsFK5iD8AoDHy6ahtTZlk'
    );
  }, []);
}
