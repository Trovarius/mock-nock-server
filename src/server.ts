import express from "express";
import proxy from "express-http-proxy";
import nock from "nock";

import MockRepository from "./gateways/mock-repository"
import RegisterMocks from "./use-cases/register-mocks"
import http, {Server} from "http"
  
const app = express();

let server : Server;

app.get("/server/close", (req, res) => {
  console.log("Closing server em 1s")
  setTimeout(() => {  
    server.close(function() { console.log('Closed :('); });
  }, 1000);
  
  res.send( "Hello world!" );
})

app.use("/", proxy('mockserver:8888'));

export async function startServer(rootFolder: string = "./test/mocks", port: number = 7777) {
  const scope = nock(`http://mockserver:8888`)

  const repo = new MockRepository(rootFolder || "./test/mocks")
  const register = new RegisterMocks(repo, scope);

  await register.register();
  server = app.listen(port, () => {
    console.log(`\n server running at http://localhost:${port}`);
  });
}

export async function stopServer(port: number) {
  http.get(`http://localhost:${port}/server/close`, () => {
    
  process.exit(1)
  })
}

if(process.env.NODE_ENV){
  startServer();
}
