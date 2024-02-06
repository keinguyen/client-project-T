import { fql } from 'fauna';
import { allowCORS, getDb } from './helpers';
import { Ticket } from './interface';

export async function getTickets() {
  try {
    const db = getDb();

    const { data } = await db.query<Array<Ticket> | null>(
      fql`Tickets.all() { title, desc, status, patientInfo, createBy, price, id, ts, channelId }`
    );

    return new Response(JSON.stringify(data, null, 2), {
      headers: allowCORS(),
    });
  } catch (err) {
    console.log(err.message);
    return new Response(
      JSON.stringify({ error: 'SERVER_ERROR', message: err.message }),
      {
        headers: allowCORS(),
        status: 500,
      }
    );
  }
}
