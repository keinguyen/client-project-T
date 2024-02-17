export enum TicketStatus {
  WAITING = 'WAITING',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export interface ITicketAttachment {
  fileId: string;
  imageView: string;
  ticketId: string;
}

export interface ITicket {
  id: string;
  title: string;
  desc: string;
  status: TicketStatus;
  patientInfo: {
    fisrtName: string;
    lastName: string;
    phoneNumber: string;
  };
  createBy: string;
  price: number | null;
  ts: {
    isoString: string;
  };
  channelId: string;
  attachmentFiles: ITicketAttachment[];
}

export interface IConversationResponse {
  streamName: string;
  accountId: string;
  ticketId: string;
}
