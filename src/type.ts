export enum TicketStatus {
  WAITING = 'WAITING',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export type Ticket = {
  id?: string;
  ts?: { isoString: string };
  createBy: string;
  title: string;
  desc: string;
  channelId: string;
  price: number;
  patientInfo: {
    fisrtName: string;
    lastName: string;
    phoneNumber: string;
  };
  status: TicketStatus;
};
