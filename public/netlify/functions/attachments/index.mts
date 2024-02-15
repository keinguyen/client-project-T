import { response } from '../helpers/request';
import { IResponse } from '../interfaces';
import { AttachmentAPI } from './interface';
import { uploadFile } from './upload';

type APIFunction = {
  [key: string]: (res: Request) => Promise<IResponse>;
};

const availableAPIs: Record<string, APIFunction> = {
  POST: {
    [AttachmentAPI.UPLOAD_ATTACHMENT_FILE]: uploadFile,
  },
};

export default async (req: Request) => {
  const subject = req.headers.get('subject') as AttachmentAPI | undefined;
  let res: IResponse = {
    data: { error: 'NO_VALID_METHOD' },
    status: 400,
  };

  console.log('req.method:', req.method);

  if (subject) {
    const callApi =
      availableAPIs[req.method as keyof typeof availableAPIs]?.[subject];

    if (callApi) {
      res = await callApi(req);
    }
  }

  return response(res);
};
