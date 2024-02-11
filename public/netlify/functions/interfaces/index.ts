export interface IResponse {
  data?: BodyInit | Record<string, unknown> | unknown[] | null;
  status?: number;
}

export type HandleMiddleware = (req: Request) => Promise<true | Response>;
