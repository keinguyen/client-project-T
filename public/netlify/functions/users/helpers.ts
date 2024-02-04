import { Client } from "fauna";
import crypto from "node:crypto";

export function getDb() {
  return new Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
}

export function allowCORS(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };
}

export function getSalt() {
  return 'Salt-key';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidParams(param: any): param is string {
  return typeof param === 'string' && !!param;
}


export function hashPassword(pw: string) {
  return crypto.pbkdf2Sync(pw, getSalt(), 1000, 64, "sha512").toString('hex');
}

export function getTokenSecret() {
  return "secret-token-jwt";
}
