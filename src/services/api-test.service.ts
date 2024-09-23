import { TApiTestParams } from "../types";
import { delay, httpMethods, incrementEmail, isEmail } from "../utils";
export const ApiTestService = async (requestParams: TApiTestParams) => {
  const {
    apiEndpoint,
    delayInSeconds,
    body,
    params,
    method,
    apiCallTimes,
    shouldIncrementFields,
    token,
    skipIncrementFields,
  } = requestParams;
  try {
    const parsedBody = JSON.parse(body || "{}");
    const parsedParams = JSON.parse(params || "{}");
    if (!apiEndpoint) return { error: "Missing API endpoint" };
    if (!httpMethods.includes(method)) return { error: "Invalid HTTP method" };
    for (let i = 0; i < (apiCallTimes || 1); i++) {
      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (shouldIncrementFields && i > 0) {
        if (params) {
          const originalParams = JSON.parse(params);
          Object.keys(parsedParams).forEach((key) => {
            if (skipIncrementFields && skipIncrementFields.includes(key)) {
              return originalParams[key];
            }
            if (isEmail(parsedParams[key])) {
              return (parsedParams[key] = incrementEmail(
                originalParams[key],
                i
              ));
            }
            return (parsedParams[key] = originalParams[key] + i);
          });
        }
        if (body) {
          const originalBody = JSON.parse(body);
          Object.keys(parsedBody).forEach((key) => {
            if (skipIncrementFields && skipIncrementFields.includes(key)) {
              return originalBody[key];
            }
            if (isEmail(parsedBody[key])) {
              return (parsedBody[key] = incrementEmail(originalBody[key], i));
            }
            return (parsedBody[key] = originalBody[key] + i);
          });
        }
      }
      if (parsedParams) {
        Object.assign(requestOptions, {
          body: JSON.stringify(parsedParams),
        });
      }
      if (parsedBody) {
        Object.assign(requestOptions, {
          body: JSON.stringify(parsedBody),
        });
      }
      if (token) {
        Object.assign(requestOptions, {
          headers: {
            ...requestOptions.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      }
      console.log(requestOptions);
      const result = await fetch(apiEndpoint, requestOptions);
      if (result.status !== 200) {
        return {
          error: `API call failed with status: ${result.status} - ${result.statusText}`,
        };
      }
      const data = await result.json();
      console.log(`API Call ${i + 1}:`, data);
      await delay(delayInSeconds || 1);
    }
    return {
      success: true,
      message: `Api called ${apiCallTimes} within delay of ${delayInSeconds} seconds successfully`,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { error: "Invalid JSON body or parameters" };
    }
    return { error: "Unknown error" };
  }
};
