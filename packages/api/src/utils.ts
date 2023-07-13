import { verify } from 'jsonwebtoken';
import { Context } from './types';

// export const APP_SECRET = 'adfSD5sd76SFF';
export const APP_SECRET = process.env.APP_SECRET;

interface Token {
  id: string;
  userType: string;
}

export function getPatientId(context: Context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    let user_id = '0';
    if (verifiedToken && verifiedToken.id && verifiedToken.userType == '2') {
      user_id = verifiedToken.id;
      return parseFloat(user_id);
    }
  }
  throw new Error('Authorization failed');
}

export function getHospitalId(context: Context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    let user_id = '0';
    if (verifiedToken && verifiedToken.id && verifiedToken.userType == '1') {
      user_id = verifiedToken.id;
      return parseFloat(user_id);
    }
  }
  throw new Error('Authorization failed');
}

export function getAdminId(context: Context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    let user_id = '0';
    if (verifiedToken && verifiedToken.userId) {
      user_id = verifiedToken.userId;
    }
    return parseFloat(user_id);
  }
}

export function ThrowJsonError(message: object) {
  throw new Error(JSON.stringify(message));
}
