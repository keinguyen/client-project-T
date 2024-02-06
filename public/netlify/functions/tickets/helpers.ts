import { Client } from 'fauna';

export function getDb() {
  return new Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
}

export function allowCORS(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  };
}
