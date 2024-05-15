const { resolve } = require('path');
const packageJson = require('./package.json');
const webpack = require('webpack');

const bundle = 'insights';
const appName = packageJson[bundle]['appname'];

module.exports = {
  appName,
  appUrl: `/${bundle}/${appName}`,
  useProxy: process.env.PROXY === 'true',
  debug: true,
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: process.env.NODE_ENV === 'development',
    }),
  ],
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
  moduleFederation: {
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          version: packageJson.dependencies['react-router-dom'],
          requiredVersion: '>=6.0.0 <7.0.0',
        },
      },
    ],
    exposes: {
      './RootApp': resolve(__dirname, '/src/AppEntry'),
      // Host Inventory Runtimes Processes Card
      './RuntimesProcessesCard': resolve(
        __dirname,
        '/src/components/RuntimesProcessesCard.tsx'
      ),
    },
  },
};
