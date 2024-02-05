import { useEffect, useState } from 'react';
import { socketService } from '../services/socketService';

export function Main() {
  const [accept, setAccept] = useState(false);
  const [dolbyData, setDolbyData] = useState<{
    streamName: string;
    accountId: string;
  }>();

  useEffect(() => {
    socketService.subscribeToJoinConversation((data) => {
      setDolbyData(data);
    });
  }, []);

  return (
    <>
      <>
        {dolbyData?.streamName ? (
          <>
            <div>Bạn có yêu cầu từ đại lý</div>
            <button onClick={() => setAccept(true)}>Accept</button>
          </>
        ) : (
          <div>Xin chào bạn đến hệ thống kiểm định</div>
        )}

        {dolbyData?.streamName && accept && (
          <iframe
            src={`https://viewer.millicast.com?streamId=${dolbyData.accountId}/${dolbyData.streamName}`}
            allowFullScreen
            width="640"
            height="480"
          ></iframe>
        )}
      </>
    </>
  );
}
