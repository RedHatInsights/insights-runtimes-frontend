const { resolve } = require("path");
const webpack = require("webpack");
const config = require("@redhat-cloud-services/frontend-components-config");
const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, "../"),
  debug: true,
  ...(process.env.BETA && { deployment: "beta/apps" }),
  ...(process.env.PROXY && {
    https: true,
    useProxy: true,
    proxyVerbose: true,
    env: `${process.env.ENVIRONMENT || "stage"}-${process.env.BETA ? "beta" : "stable"}`, // for accessing prod-beta start your app with ENVIRONMENT=prod and BETA=true
    appUrl: process.env.BETA
      ? ['/beta/insights/inventory', '/preview/insights/inventory']
      : '/insights/inventory',
    routes: {
      ...(process.env.CONFIG_PORT && {
        [`${process.env.BETA ? "/beta" : ""}/config`]: {
          host: `http://localhost:${process.env.CONFIG_PORT}`,
        },
      }),
      ...(process.env.CHROME_SERVICE && { // for specifying a local instance of chrome-service-backend
        // web sockets
        '/wss/chrome-service/': {
          target: `ws://localhost:${process.env.CHROME_SERVICE}`,
          // To upgrade the connection
          ws: true,
        },
        // REST API
        '/api/chrome-service/v1/': {
          host: `http://localhost:${process.env.CHROME_SERVICE}`,
        },
      }),
    },
  }),
  ...(process.env.MOCK && {
    customProxy: [
      {
        context: ["/api/inventory/v1/groups", "/api/inventory/v1/hosts"], // you can adjust the `context` value to redirect only specific endpoints
        target: "http://127.0.0.1:4010", // default prism port
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api/inventory/v1": "" },
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader("x-rh-identity", "foobar"); // avoid 401 errors by providing necessary security header
        },
      },
      {
        context: ["/api/runtimes-inventory-service/v1/instances"],
        target: "http://127.0.0.1:3000",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api/runtimes-inventory-service/v1/instances": "instances",
        },
      },
    ],
  }),
});

plugins.push(
  require("@redhat-cloud-services/frontend-components-config/federated-modules")(
    {
      root: resolve(__dirname, "../"),
      useFileHash: false,
      exposes: {
        // Application root
        "./RootApp": resolve(__dirname, "../src/AppEntry"),
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
    IS_DEV: true,
  }),
);

webpackConfig.resolve.alias = {
  ...webpackConfig.resolve.alias,
  reactRedux: resolve(__dirname, "../node_modules/react-redux"),
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

webpackConfig.devServer.client.overlay = false;

module.exports = {
  ...webpackConfig,
  plugins,
};
