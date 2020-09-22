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
