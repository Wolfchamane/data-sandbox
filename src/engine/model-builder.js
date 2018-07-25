const DataSandboxFactory = require('../_factory');
const DataSandboxModelsTypeBase = require('../models/type/_base');
const DataSandboxModelsTypeString = require('../models/type/String');
const DataSandboxModelsTypeDate = require('../models/type/Date');

DataSandboxFactory.register('DataSandoxModelsTypeBase', DataSandboxModelsTypeBase);
DataSandboxFactory.register('DataSandboxModelsTypeString', DataSandboxModelsTypeString);
DataSandboxFactory.register('DataSandboxModelsTypeDate', DataSandboxModelsTypeDate);

const modelBuilder = model =>
{
    const instance = {};
    Object.keys(model).forEach(
        key =>
        {
            const config = model[key];
            instance[key] = DataSandboxFactory.create(`DataSandboxModelsType${config.type}`, config);
        }
    );

    instance.toJSON = () =>
    {
        let json = {};
        Object.keys(instance).forEach(key =>
        {
            const aux = {};
            aux[key] = instance[key].value;
            json = Object.assign(json, aux);
        });

        return json;
    };

    return instance;
};

module.exports = modelBuilder;
