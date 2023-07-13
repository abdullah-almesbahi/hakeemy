import { LOGIN_REQUEST } from './ducks';

// {
// "mobile_no":"503000074",
// "user_type":"2";
// "country_code_id":"2";
// "api_version":"v1";
// "app_version_code":5;
// "device_name":"Google";
// "device_version":"Android SDK built for x86";
// "device_token":"7C4831C71DD9A6E137C18DBE1BBE4ED895F369B9";
// "device_type":"android";
// "fcm_id":"d_JmBihbqCw:APA91bHdOVeaDcTg-rZayRZ57bPHn7Yi5cxHAxKQM53p5oxn2S7hf5lH7zkFINWxCF34fEnBAZl-8f11j5t6YKUxXT12OhvqZBe5O4tn6Udpv7C5Sk6Q4xXOI5xzsMSU5c-t6LYulpjh";
// "invited_code":"";
// "change_number":false}

export interface OtpDataType {
  mobile_no: number;
  user_type: number;
  country_code_id: number;
  api_version: string;
  app_version_code: number;
  device_name: string;
  device_version: string;
  device_token: string;
  device_type: string;
  fcm_id: string;
  invited_code: string;
  change_number: boolean;
}

export interface loginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: any;
  meta: any;
}

export type LoginActionTypes = loginRequestAction;
