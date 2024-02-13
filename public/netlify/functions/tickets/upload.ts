import { google } from 'googleapis';
import { Readable } from 'stream';
import { IResponse } from '../helpers/request';
import { getDb } from '../helpers/server';
import { fql } from 'fauna';

class GoogleDriveService {
  private oauth2Client;
  private folderId = '1VPYiuW1M7PMPsKFxoSOpD3sTn_-tZGAN';

  constructor() {
    this.oauth2Client = new google.auth.GoogleAuth({
      credentials: {
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDNsS035N1jIAID\nQOiwO+ArB3w6w1DLfsR3JEspgrQv5biNeFVoO8+H0QkBVzVY6KtwHSJ1/9eT/1LI\nBINHmyNc2nizt8lSysRiBCR7CzuMW7n5TeKL0/eeArC+npuXgRE/iQO0qf/6tkg7\nzZiJkleAZoBpTjEA5SRR9diDFCk81ikpdGbTRpo0tNkb9lDrvomqDAESAnEPgw2L\ntqoTL7tDOhckW0xgw5xCM6koFwynoa0PXfxkFwsrkbwBtzqBvEALORYAO2bvzgy0\nARFuwttmH0Xog9i5vNWdZENaKoVAt/Gj5FfoiXihozoKdISS0671Qjx9w1DmXoeI\nrImHHz2hAgMBAAECggEAC0rZcUgQA6O/KIp1G9rgVROILkglVMXMCxY1gCe937FM\nTVMYgwjTWb1P+PlCMa0YX3xFiqtuxyAw64jHAIL+X2Y+b2GglXpK3MPQdK34zMfq\n1JGerIilRqZsKYSsL4hKuBERbrxtaWS2mNM8xW2dRdco/NDNZrGRVGSUVsV1hsfK\nCoTlRZAtascJGXJV3MfSRAdw52PjtNWIEOdfasb4nwTgIpPNYKK0Aj1fxJlGfQo/\nerN3vXUlARbTVwMuRBZPIgshIX30y0Ww0ZxcBGvQFW9JYdLsr6Wz0HKq2lbeHKI1\nJQJ+itFz93Zj/1DMH87APo2XJxaO/zwalKY2hhmEhwKBgQD9GVCFFpb/L31PU6mp\nl835bgEEalYid39bppmI6jrMSG8l0xZi3bB7sWS99Pbk0LqVxHCL2btK7UYjT3c8\nqaYsI9k3K9JdGFvZUfcdLyszYczAEIMUv0l65nWdKii0MemBj6EYcp+Hfc68oIGc\n/v+qpYgfjRpTwMaXVQfYwO2ltwKBgQDQDMDLTbBcqLodRvxcUVt1LAThbHxO6/rz\nSbwPR0N06WFs7l9rXUmTYIMyaqgNngwo3+9TS2Sz9gBd0F6RKBREebD0h7/+QVlA\naPKbcmcjbYJ47QGqhEaHDRosMYVrUJFBVC/EtKBj6/BLF0j+nH1q4vu7X9foSVMD\nZxCsuFL3ZwKBgG+0xYoH31r/ncHuPfqhCoKlH4PQXvXVYfuUez0njA3vhkbedIns\nKGFfeQQx4uo4ibFiQv4mefhm4sbg4tJ+Wd4vcEZea/k0sA0plPRnhhymdJTsdL4q\ncwbwQka8fbySLupE9yfwJyLIzv8HpE0jarnpVzv9rfn7ImtWVyE+fWTfAoGAVmRV\nUpbKG0/9KNcnR/aIsdk7lZgE7ojTRl9h9j4zZsLar+80NFMikE5NbIwZiL4OcpK6\nwK3X/VqzwEEcY85uzBh0QLZ2JVBhjXuG8sHIzk9VFH3maTZQSxhHu/48Vtm315br\n1xTiXVvGBoh+ySuWcOIcgixEbbK1A/6yT+ainRUCgYBSbftYQte+FCyIRnxIEWT/\nB2Fh9byZ2+mM45Z/6YYNEAHoFQciaBrPnUdODkCFZmaT03rkOk+JJT3/sNiHnblh\nh8HJP48PsyXEbKH7eY3SESsFuDx4fZ50wCGq5SXH7iHroT6Ar5aBV1F2j6yxvqjs\nyvAk08scfrZfhyltFC3nEQ==\n-----END PRIVATE KEY-----\n',
        client_email: 'banhcanhcua@banhcanhcua.iam.gserviceaccount.com',
        client_id: '102971638354124418377',
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
  }

  getFile = async (fileId: string) => {
    const drive = google.drive({
      version: 'v3',
      auth: this.oauth2Client,
    });

    const response = await drive.files.get({ fileId, alt: 'media' });
    const imageType = response.headers['content-type'];
    const file = response.data as unknown as Blob;
    const base64 = btoa(
      new Uint8Array(await file.arrayBuffer()).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    return 'data:' + imageType + ';base64,' + base64;
  };

  createFile = async (payload: FormData) => {
    const ticketId = payload.get('ticketId');
    const files: FormDataEntryValue[] = payload.getAll('file');

    const drive = google.drive({
      version: 'v3',
      auth: this.oauth2Client,
    });

    for (let index = 0; index < files.length; index++) {
      const file = files[index] as File;

      const result = await drive.files.create({
        requestBody: {
          name: file.name,
          parents: [this.folderId],
        },
        media: {
          mimeType: 'image/jpeg',
          body: Readable.from(
            Buffer.from(new Uint8Array(await file.arrayBuffer()))
          ),
        },
        fields: 'id',
      });

      const fileId = result.data?.id;
      if (fileId) {
        const db = getDb();
        await db.query(fql`
            AttachmentFiles.create({ ticketId: ${ticketId}, fileId: ${fileId}  })
        `);
      }
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function uploadFile(req: Request): Promise<IResponse> {
  try {
    const formData = await req.formData();
    const googleDriveService = new GoogleDriveService();
    await googleDriveService.createFile(formData);

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
