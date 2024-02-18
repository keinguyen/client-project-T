import { IConversationResponse } from "@/interfaces/tickets";
import { StreamVideoStyled, VideoScreen } from "./StreamVideo.styles";
import { useMemo } from "react";

interface Props extends IConversationResponse {}

export function StreamVideo({ accountId, streamName }: Props) {
  const url = useMemo(
    () => `https://viewer.millicast.com?streamId=${accountId}/${streamName}`,
    [accountId, streamName],
  );

  return (
    <StreamVideoStyled>
      <VideoScreen src={url} allowFullScreen />
    </StreamVideoStyled>
  );
}
