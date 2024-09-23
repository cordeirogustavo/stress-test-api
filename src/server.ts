import express from "express";
import { ApiTestController } from "./controllers";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/stress/test", ApiTestController);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
