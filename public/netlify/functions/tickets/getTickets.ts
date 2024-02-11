import { fql } from 'fauna';
import { Ticket } from './interface';
import { getDb } from '../helpers/server';
import { IResponse } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getTickets(res: Request): Promise<IResponse> {
  try {
    const db = getDb();

    const { data } = await db.query<Array<Ticket> | null>(
      fql`Tickets.all() { title, desc, status, patientInfo, createBy, price, id, ts, channelId }`
    );

    if (data) {
      throw new Error('NO TICKET FOUND');
    }

    return { data };
  } catch (err) {
    console.log('GET TICKETS ERROR:', err.message);

    return {
      data: { error: 'SERVER_ERROR', message: err.message },
      status: 500,
    };
  }
}
