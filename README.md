# Insights Runtimes Frontend

This is the frontend application for Insights Runtimes Inventory. It is based on the [frontend-starter-app](https://github.com/redhatInsights/frontend-starter-app).

This repository is in the process of getting on-boarded, and as such the content specified in this README will likely be outdated sooner than later. If commands listed below don't work as intended and/or don't have an obvious alternative, it's likely the functionality has outpaced this README and we'll try to update it as soon as possible.

## Initial setup

In order to access the https://[env].foo.redhat.com in your browser, you have to add entries to your `/etc/hosts` file. This is a **one-time** setup that has to be done only once (unless you modify hosts) on each devel machine.

Best way is to edit manually `/etc/hosts` on your localhost line:

```
127.0.0.1 <your-fqdn> localhost prod.foo.redhat.com stage.foo.redhat.com
```

Alternatively you can do this by running following command:
```bash
npm run patch:hosts
```

If this command throws an error run it as a `sudo`:
```bash
sudo npm run patch:hosts
```


Lastly, make sure you are using [Red Hat proxy](http://hdn.corp.redhat.com/proxy.pac).

## Running locally

At the moment, there is no dedicated landing page for the Runtimes Inventory Frontend content, which means that running this repository locally by itself won't display anything meaningful *yet*. In the meantime, here is how you can run and develop on this repository.

Install the project dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run start:proxy
```

The local version of the app will be available at https://stage.foo.redhat.com:1337/insights/inventory/.

### Running locally with a mocked data

```bash
npm run start:mock
```

This will run the local app with a `customProxy` to route traffic intended for the host and runtimes backends towards our locally running APIs instead. See the following sections in this readme for more information on running the mock backends.

This will run this repository with all the requisite information to populate the Inventory page and start displaying our mock data. Once everything is running, you should be able to visit https://stage.foo.redhat.com:1337/insights/inventory and start viewing Inventory and Runtimes information.

### Running locally with a local insights-chrome and chrome-service-backend

This second option works intandem with a local [chrome frontend](https://github.com/RedHatInsights/insights-chrome) and [chrome backend](https://github.com/RedHatInsights/chrome-service-backend) with the aim of developing standalone pages and integrating with the Hybrid Cloud Console (HCC) navigation.

#### In chrome-service-backend

First, you need to setup a local .env file as specified in the `chrome-service-backend` readme: [link](https://github.com/RedHatInsights/chrome-service-backend?tab=readme-ov-file#local-testing)


Next, in one terminal you'll run the command above to spin up a local database and instance of kafka.
```bash
make infra
```

Lastly, run the backend server locally with the command listed above.
```bash
go run .
```
#### In insights-runtimes-frontend (this project)

Run insights-runtimes-frontend without a proxy on a specified port, 8002 in this case.
```bash
npm run start -- --port=8002
```

#### In insights-chrome

In this last step, you'll run `insights-chrome` in dev mode, and list the local services in the `LOCAL_APPS` env variable, and specify which port the local `chrome-service-backend` is running on (8000 by default).

Note: this step waits for the local inventory and runtimes services to be up and ready. The inventory service sometimes takes longer to setup (~30 seconds), so if you're running all of these commands quickly in succession and encounter an error, this might be the reason.
```bash
LOCAL_APPS=runtimes:8002~http CHROME_SERVICE=8000 npm run dev
```

## Mocking Host Inventory API
```bash
cd mock/mock-host-inventory
npm install && npm run mock-server
```

This repository contains a sub-project that replicates the same mock API that is used in the `insights-inventory-frontend` repository.

See [mock-host-inventory](/mock/mock-host-inventory/README.md) for more information.

## Mocking Runtimes Inventory API

```bash
npm run mock-instances
```
This script utilizes `json-server` and simply hosts the contents of the `mock/instances.json` file at `localhost:3000`. The data in `instances.json` was pulled from an integration test running in insights-runtimes-inventory, and was simply a request to the `instances` endpoint that returned two `JvmInstances`. There is a custom proxy provided in the `dev.webpack.config.js` that when used will route traffic directed at the actual instances endpoint towards our local service instead. This mock service is nice because it feeds "real" data into our locally running UI, and looks nicer for demonstration purposes. However, it will always return the same two instances regardless of what request you make, and there is no mock authentication step so this isn't the greatest for imitating the processes this project will be making in a real environment.

## Common Problems You Might Encounter
(taken from the insights-inventory-frontend readme, but also applicable here)

* Some APIs we use require the latest version of their client package in order to enjoy the latest properties they provide.
In case you checked the Network tab in the console and had a look at the requiered API call that should contain a property you need to fetch and use, but did not see this property in the list of properties in the Response tab, make sure you have the latest version of the client package that contains this API.
To make sure the versions align, 
Have a look at your `package.json` file and compare the appropriate client package version (that should have the API you need) with the latest published version on npmjs.com.
In case they don't match, update this client package to it's latest version by running this command: `npm i @redhat-cloud-services/{name-of-client-package}@latest`

Then, re-install the modules by running this command: `rm -rf node_modules && npm install`

And re-run the application
This should solve this issue.

In case these steps did not solve your issue, it is possible that the latest package had not been released yet.
Please contact the appropriate team to release the package you are using, and go over the described process of updating the client package version again.
