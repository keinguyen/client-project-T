import { useCallback, useEffect, useMemo, useState } from "react";
import type { ITicket } from "@/interfaces/tickets";
import streamChatServices from "@/services/stream-chat.services";
import { useGeneralSelector } from "@/store/general";
import { acceptConversation } from "@/services/tickets";

type ActiveChanel = ReturnType<typeof streamChatServices.getChannelById>;

export function useInitChat(ticket?: ITicket | null) {
  const { id, channelId } = ticket || {};

  const chatClient = useGeneralSelector((store) => store.chatClient)!;
  const requestCallTickets = useGeneralSelector((store) => store.requestCallTickets);

  const [activeChannel, setActiveChannel] = useState<ActiveChanel>();
  const [isAcceptedCall, setIsAcceptedCall] = useState(false);

  const clientUserID = chatClient.userID;

  const requestCallInfo = useMemo(
    () => requestCallTickets.find(({ ticketId }) => ticketId === id),
    [requestCallTickets, id],
  );

  const acceptCall = useCallback(() => {
    if (requestCallInfo) {
      acceptConversation(requestCallInfo);
      setIsAcceptedCall(true);
    }
  }, [requestCallInfo]);

  const cancelCall = useCallback(() => {
    setIsAcceptedCall(false);
  }, []);

  useEffect(() => {
    async function init() {
      if (!channelId) {
        return;
      }

      const channel = streamChatServices.getChannelById(channelId);

      if (!channel || !clientUserID) {
        alert('NO CHANEL OR USER ID AVAILABLE');
        return;
      }

      setActiveChannel(channel);

      const membersInChannel = await channel.queryMembers({
        user_id: { $in: [clientUserID] },
      });

      if (membersInChannel.members.length === 0) {
        await channel.addMembers([clientUserID]);
      }
    }

    init();
  }, [channelId, clientUserID]);

  useEffect(() => {
    if (!requestCallInfo) {
      cancelCall();
    }
  }, [requestCallInfo, cancelCall]);

  return {
    requestCallInfo,
    chatClient,
    activeChannel,
    isAcceptedCall,
    acceptCall,
    cancelCall,
  };
}
