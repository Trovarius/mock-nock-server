import express from "express";
import proxy from "express-http-proxy";
import nock from "nock";

import MockRepository from "./gateways/mock-repository"
import RegisterMocks from "./use-cases/register-mocks"
  
const app = express();
const port = 8888;

const scope = nock(`http://mockserver:8888`)

const repo = new MockRepository("./test/mocks")
const register = new RegisterMocks(repo, scope);

app.use("/", proxy('mockserver:8888'));

async function start() {
  await register.register();
  app.listen(port, () => {
    console.log(`\n server running at http://localhost:${port}`);
  });
}

start();