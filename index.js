const path = require('path');
const fs = require('fs');

const DataSandboxMicroServer = require('./src/engine/micro-server');

const modelBuilder = require('./src/engine/model-builder');

const resolve = src =>
{
    return path.resolve(__dirname, './', src);
};

const demoPath = resolve('demo/endpoints');
fs.readdirSync(demoPath).forEach(endpoint =>
{
    endpoint = require(resolve(`demo/endpoints/${endpoint}`));
    const model = require(resolve(`demo/models/${endpoint.model}.js`));
    endpoint.value = [];
    for (let i = 0; i <= (endpoint.sample - 1); i++)
    {
        endpoint.value.push(modelBuilder(model));
    }

    (new DataSandboxMicroServer('localhost', 3000, endpoint));
});
