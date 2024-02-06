import { fql } from 'fauna';
import * as yup from 'yup';
import { allowCORS, getDb } from './helpers';
import { Ticket } from './interface';

const schema = yup.object({
  patientInfo: yup.object({
    fisrtName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    phoneNumber: yup.string().trim().required(),
  }),
  price: yup.number().notRequired(),
  status: yup.string().trim().required(),
  channelId: yup.string().trim().required(),
  createBy: yup.string().trim().required(),
  title: yup.string().trim().required(),
  desc: yup.string().trim().required(),
});

function isValidBody(body: Ticket): body is Ticket {
  try {
    schema.validateSync(body);
    return true;
  } catch (err) {
    return false;
  }
}

export async function create(req: Request) {
  try {
    const db = getDb();

    const body = await req.json();
    console.log('body:', body);

    if (!isValidBody(body)) {
      return new Response(JSON.stringify({ error: 'INVALID_BODY' }), {
        headers: allowCORS(),
        status: 400,
      });
    }

    const { createBy, desc, patientInfo, price, status, channelId, title } =
      body;

    await db.query(fql`
      Tickets.create({ title: ${title}, desc: ${desc}, channelId: ${channelId}, status: ${status}, patientInfo: ${patientInfo}, createBy: ${createBy}, price: ${price} })
    `);

    return new Response(JSON.stringify({ status: 'success' }, null, 2), {
      headers: allowCORS(),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'SERVER_ERROR', message: err }),
      {
        headers: allowCORS(),
        status: 500,
      }
    );
  }
}
