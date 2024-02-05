import { useEffect } from 'react';
import { socketService } from '../services/socketService';

export function Main() {
  useEffect(() => {
    socketService.subscribeToJoinConversation(({ accountId, streamName }) => {
      console.log('****** accountId ******', accountId);
      console.log('****** streamName ******', streamName);
    });
  }, []);
  return <>Hello</>;
}
