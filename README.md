# mock-nock-server

Package crate to execute [nock](https://github.com/nock/nock) test as mock server.

# Create mocks

You must create a file `*.mock.js` for each nock you like to include

```js
// mocks/teste.mock.js
module.exports = (nockScope) => {
  nockScope
    .get("/repos/atom/atom/license")
    .reply(200, {
      license: {
        key: "mit",
        name: "MIT License",
        spdx_id: "MIT",
        url: "https://api.github.com/licenses/mit",
        node_id: "MDc6TGljZW5zZTEzddddddd",
      },
    })
    .persist();
};

```

# Running server

Execute the following command to create a server

```sh
# this will start de mock from the folder mockFolder in the port 5000
mock-rock start ./mocksFolder -p 5000

```
In case you have all `nock` configurations already setup you might want to run it from the `src` folder

```sh
# this will start de mock from the folder mockFolder in the port 5000
mock-rock start ./src # starts at default port 7777
```