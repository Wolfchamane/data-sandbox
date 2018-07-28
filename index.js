/* eslint-disable no-console */
console.log(`data-sandbox Copyright (C) 2018 Arturo Martínez
This program comes with ABSOLUTELY NO WARRANTY; for details type ????.
This is free software, and you are welcome to redistribute it
under certain conditions; type ??? for details.`);
/* eslint-enable no-console */

const path = require('path');
const fs = require('fs');

const DataSandboxMicroServer = require('./src/engine/micro-server');
const DataSandboxModelsEndpoint = require('./src/models/endpoint');
const DataSandboxModelsInstance = require('./src/models/instance');

/* eslint-disable arrow-body-style */
const resolve = src =>
{
    return path.resolve(__dirname, './', src);
};
/* eslint-enable arrow-body-style */

const demoPath = resolve('demo/endpoints');
fs.readdirSync(demoPath).forEach(endpoint =>
{
    /* eslint-disable global-require */
    endpoint = require(resolve(`demo/endpoints/${endpoint}`));
    endpoint.model = require(resolve(`demo/models/${endpoint.model}.js`));
    /* eslint-enable global-require */
    endpoint.value = [];
    for (let i = 0; i <= (endpoint.sample - 1); i++)
    {
        endpoint.value.push(new DataSandboxModelsInstance(endpoint.model));
    }

    return new DataSandboxMicroServer('localhost', 3000, new DataSandboxModelsEndpoint(endpoint));
});
