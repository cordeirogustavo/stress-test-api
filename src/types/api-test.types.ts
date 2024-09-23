export type TApiTestParams = {
  apiEndpoint: string;
  delayInSeconds: number;
  body?: string;
  params?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  apiCallTimes: number;
  shouldIncrementFields?: boolean;
  token?: string;
  skipIncrementFields?: string[];
};
