import express from "express";
import proxy from "express-http-proxy";
import nock from "nock";
import cors from "cors"

import MockRepository from "./gateways/mock-repository"
import RegisterMocks from "./use-cases/register-mocks"
import http, {Server} from "http"
  
const app = express();
app.use(cors())

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

  await registerMocks(rootFolder)

  server = app.listen(port, () => {
    console.log(`\n server running at http://localhost:${port}`);
  });
}

export async function registerMocks(rootFolder: string = "./mocks", urlBase: string = `http://mockserver:8888`) {
  const scope = nock(urlBase)
  const repo = new MockRepository(rootFolder || "./test/mocks")
  const register = new RegisterMocks(repo, scope);
  await register.register();
}

export async function stopServer(port: number) {
  http.get(`http://localhost:${port}/server/close`, () => {
    
  process.exit(1)
  })
}

if(process.env.NODE_ENV){
  startServer();
}
