export enum AttachmentAPI {
  UPLOAD_ATTACHMENT_FILE = 'attachments.api.uploadfiles',
}

export type AttachmentFile = {
  fileId: string;
  ticketId: string;
  imageView: string;
};
