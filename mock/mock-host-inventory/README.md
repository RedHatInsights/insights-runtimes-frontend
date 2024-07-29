# Mock Host Inventory

This sub-project mocks the insights-host-inventory API in the same way that [insights-inventory-frontend](https://github.com/RedHatInsights/insights-inventory-frontend?tab=readme-ov-file#mocking-inventory-api) used to do. After the inventory frontend updated the Prism dependency to v5.8.1, the mock server has not been the same, and frequently causes errors when running the proxied services locally. These errors were introduced in Prism v4.10.6, so this project aims to simply re-create the conditions that made the mock server run properly in the first place.

## Instructions

In one terminal, install Prism v4.10.5 and it's dependencies, and run the mock server (by default on port 4010).
```bash
npm install
npm run mock-server
```

In the project root, use two terminals:

One to run the json-server to serve mock insights-runtimes-inventory data.
```bash
npm run mock-instances
```

One to run the service using `customProxy` as defined in the fec.config.js.
```bash
npm run start:mock
```

Navigate to https://stage.foo.redhat.com:1337/insights/inventory, and the `Systems` table should populate with mocked data.

