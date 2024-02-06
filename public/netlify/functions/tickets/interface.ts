export enum TicketStatus {
  WAITING = 'WAITING',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export type Ticket = {
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
};
