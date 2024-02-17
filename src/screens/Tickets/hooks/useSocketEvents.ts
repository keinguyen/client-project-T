import { useEffect } from "react";
import { useSocketActions } from "@/hooks/useSocketActions";
import { useGeneralCommit } from "@/store/general";
import { IConversationResponse } from "@/interfaces/tickets";

export function useSocketEvents() {
  const commit = useGeneralCommit();
  const { subscribe } = useSocketActions();

  useEffect(() => subscribe('joinConversation', (data: IConversationResponse) => {
    commit(({ requestCallTickets }) => {
      const existedRequest = requestCallTickets.some(({ ticketId }) => ticketId === data.ticketId);

      return {
        requestCallTickets: existedRequest
          ? requestCallTickets
          : requestCallTickets.concat(data),
      };
    })
  }), [subscribe, commit]);

  useEffect(() => subscribe('endConversation', (data: IConversationResponse) => {
    commit(({ requestCallTickets }) => {
      let newRequestCallTickets = requestCallTickets;
      const existedRequestIndex = requestCallTickets.some(({ ticketId }) => ticketId === data.ticketId);

      if (existedRequestIndex) {
        newRequestCallTickets = newRequestCallTickets.filter(({ ticketId }) => ticketId !== data.ticketId);
      }

      return { requestCallTickets: newRequestCallTickets };
    })
  }), [subscribe, commit]);
}
