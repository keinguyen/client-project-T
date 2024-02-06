import { fql } from 'fauna';
import * as yup from 'yup';
import { Ticket } from './interface';
import { getDb } from '../helpers/server';
import { IResponse } from '../helpers/request';

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

export async function create(req: Request): Promise<IResponse> {
  try {
    const db = getDb();

    const body = await req.json();

    if (!isValidBody(body)) {
      return {
        data: { error: 'INVALID_BODY' },
        status: 400,
      };
    }

    const { createBy, desc, patientInfo, price, status, channelId, title } =
      body;

    await db.query(fql`
      Tickets.create({ title: ${title}, desc: ${desc}, channelId: ${channelId}, status: ${status}, patientInfo: ${patientInfo}, createBy: ${createBy}, price: ${price} })
    `);

    return {
      data: { status: 'Create Ticket Success' },
    };
  } catch (err) {
    return {
      data: { error: 'SERVER_ERROR', message: err },
      status: 500,
    };
  }
}
