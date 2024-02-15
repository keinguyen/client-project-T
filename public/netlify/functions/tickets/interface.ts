import { AttachmentFile } from '../attachments/interface';

export enum TicketAPI {
  GET_LIST = 'tickets.api.getList',
  CREATE_TICKET = 'tickets.api.createTicket',
}

export enum TicketStatus {
  WAITING = 'WAITING',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export type Ticket = {
  id?: string;
  createBy: string;
  title: string;
  desc: string;
  price: number;
  channelId: string;
  patientInfo: {
    fisrtName: string;
    lastName: string;
    phoneNumber: string;
  };
  status: TicketStatus;
  attachmentFiles?: AttachmentFile[];
};
