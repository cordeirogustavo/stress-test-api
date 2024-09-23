import { Request, Response } from "express";
import { TApiTestParams } from "../types";
import { ApiTestService } from "../services";

export const ApiTestController = async (req: Request, res: Response) => {
  const {
    apiEndpoint,
    delayInSeconds,
    body,
    method,
    apiCallTimes,
    shouldIncrementFields,
    token,
    skipIncrementFields,
  } = req.body as TApiTestParams;
  const apiTestResult = await ApiTestService({
    apiEndpoint,
    delayInSeconds,
    body,
    method,
    apiCallTimes,
    shouldIncrementFields,
    token,
    skipIncrementFields,
  });
  res.send(apiTestResult);
};
