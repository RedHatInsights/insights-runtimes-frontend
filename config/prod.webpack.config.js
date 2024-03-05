/* eslint-disable max-len */
const { resolve } = require("path");
const webpack = require("webpack");
const config = require("@redhat-cloud-services/frontend-components-config");
const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, "../"),
  debug: true,
  ...(process.env.BETA === "true" && { deployment: "beta/apps" }),
});

plugins.push(
  require("@redhat-cloud-services/frontend-components-config-utilities/federated-modules")(
    {
      root: resolve(__dirname, "../"),
      exposes: {
        // Host Inventory Runtimes Processes Card
        "./RuntimesProcessesCard": resolve(
          __dirname,
          "../src/components/RuntimesProcessesCard.tsx",
        ),
      },
      shared: [
        {
          "react-router-dom": {
            singleton: true,
            import: false,
            version: "*",
          },
        },
      ],
    },
  ),
);

plugins.push(
  new webpack.DefinePlugin({
    IS_DEV: false,
  }),
);

webpackConfig.resolve.alias = {
  ...webpackConfig.resolve.alias,
  "html-webpack-plugin": resolve(
    __dirname,
    "../node_modules/html-webpack-plugin",
  ),
};

webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  },
];

module.exports = {
  ...webpackConfig,
  plugins,
};
