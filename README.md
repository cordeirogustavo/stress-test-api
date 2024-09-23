# Stress Test API

This API is used to perform stress tests on other endpoints, simulating multiple requests with a configurable payload.

## How It Works

The API repeatedly sends requests to the provided endpoint, with the ability to:

- Set a delay between requests (`delayInSeconds`)
- Send a customizable request body (`body`)
- Specify the HTTP method (`method`)
- Define how many times the request should be repeated (`apiCallTimes`)
- Automatically increment certain fields in the request body for each call (`shouldIncrementFields`)
- Define which fields should be ignored during increment (`skipIncrementFields`)

[You can use this link to stringfy your body or params](https://jsonformatter.org/json-stringify-online)

### Parameters

- apiEndpoint: The URL where the requests will be sent.
- delayInSeconds: Time in seconds to wait between each request. (Optional - Default 1 second)
- body: Request body to be sent. Must be a valid JSON string. (Optional)
- method: HTTP method to be used (e.g., POST, GET).
- apiCallTimes: Number of times the request will be repeated. (Optional - Default 1)
- shouldIncrementFields: Defines whether certain fields in the body should be automatically incremented. (Optional)
- skipIncrementFields: List of fields that should not be incremented. (Optional)

#### Request Example

##### Endpoint

`POST /stress-test`

###### Request Body

```json
{
  "apiEndpoint": "http://your-api-url/your-endpoint",
  "delayInSeconds": 1,
  "body": "your body in JSON string format",
  "params": "your params in JSON string format",
  "method": "POST",
  "apiCallTimes": 100,
  "shouldIncrementFields": true,
  "skipIncrementFields": [
    "field1_to_skip_increment",
    "field2_to_skip_increment",
    "field3_to_skip_increment"
  ]
}
```

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= 21.x
- [npm](https://www.npmjs.com/) >= 10.x

## Installation

1. Clone this repository:

```bash
git clone https://github.com/cordeirogustavo/stress-test-api.git
```

2. Install dependency

   ```bash
   npm i
   ```

3. Run locally

   ```bash
   npm run dev
   ```
