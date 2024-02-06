import { Client } from "fauna";

export function getDb() {
  return new Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
}

export function allowCORS(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidParams(param: any): param is string {
  return typeof param === 'string' && !!param;
}
