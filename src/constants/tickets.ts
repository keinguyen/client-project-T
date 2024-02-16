import { TicketStatus } from "@/interfaces/tickets";
import { blue, green, orange } from '@/constants/colors';

export const statusColor: Record<TicketStatus, string> = {
  [TicketStatus.PENDING]: orange,
  [TicketStatus.WAITING]: blue,
  [TicketStatus.SUCCESS]: green,
};
