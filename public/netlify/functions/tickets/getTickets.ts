import { fql } from 'fauna';
import { Ticket } from './interface';
import { getDb } from '../helpers/server';
import { IResponse } from '../interfaces';
import { AttachmentFile } from '../attachments/interface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getTickets(req: Request): Promise<IResponse> {
  try {
    const db = getDb();

    const url = new URL(req.url);
    const status = url.searchParams.get('status');

    const query = status
      ? fql`Tickets.all().where(.status == ${status}) { title, desc, status, patientInfo, createBy, price, id, ts, channelId }`
      : fql`Tickets.all() { title, desc, status, patientInfo, createBy, price, id, ts, channelId }`;

    const ticketRes = await db.query<{ data: Ticket[] } | null>(query);

    const tickets = ticketRes.data?.data;
    if (tickets?.length) {
      const ticketIds = tickets.map((e) => e.id || '');
      const attachmentFilesRes = await db.query<{
        data: AttachmentFile[];
      } | null>(
        fql`AttachmentFiles.where(e => ${ticketIds}.includes(e.ticketId)) { fileId, imageView, ticketId }`
      );

      const attachmentFiles = attachmentFilesRes.data?.data;
      const data = tickets.reduce((r, n) => {
        return [
          ...r,
          {
            ...n,
            attachmentFiles: attachmentFiles?.filter(
              (e) => e.ticketId === n.id
            ),
          },
        ] as Ticket[];
      }, [] as Ticket[]);

      return {
        data,
      };
    }

    return { data: tickets };
  } catch (err) {
    console.log('GET TICKETS ERROR:', err.message);

    return {
      data: { error: 'SERVER_ERROR', message: err.message },
      status: 500,
    };
  }
}
