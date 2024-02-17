import { fql } from 'fauna';
import { getDb } from '../helpers/server';
import { IResponse } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function uploadFile(req: Request): Promise<IResponse> {
  try {
    const result: {
      ticketId: string;
      files: Array<{ fileId: string; thumbnailLink: string }>;
    } = await req.json();
    const { files, ticketId } = result;

    const db = getDb();
    await Promise.all(
      files.map((file) => {
        const { fileId, thumbnailLink } = file;
        return db.query(fql`
      AttachmentFiles.create({ ticketId: ${ticketId}, fileId: ${fileId}, imageView: ${(
          thumbnailLink || ''
        )?.replace('=s220', '')}  })
  `);
      })
    );

    return {
      data: { status: 'Upload file success' },
    };
  } catch (err) {
    console.log('UPLOAD FILE ERROR:', err.message);
    return {
      data: { error: 'SERVER_ERROR', message: err.message },
      status: 500,
    };
  }
}
