module.exports = (nockScope) => {
  nockScope
    .put("/repos/atom/atom")
    .reply(200, {
      license: {
        key: "mit",
        name: "aaaaaaa",
        spdx_id: "MIT",
        url: "https://api.github.com/licenses/mit",
        node_id: "MDc6TGljZW5zZTEzddddddd",
      },
    })
    .persist();
};
