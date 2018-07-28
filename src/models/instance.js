const DataSandboxFactory = require('../_factory');

// -------------------------------------------------------------------------------------
/* First we resister all type values - DO NOT MODIFY THIS */
DataSandboxFactory.register('DataSandboxModelsTypeString', require('./type/String'));
DataSandboxFactory.register('DataSandboxModelsTypeDate', require('./type/Date'));
// -------------------------------------------------------------------------------------

/**
 *  Returns a new instance of an model value
 *  @namespace  data-sandbox.models
 *  @class      data-sandbox.models.Instance
 *  @requires   DataSandboxFactory
 */
module.exports = class DataSandboxModelsInstance
{
    /**
     * @constructor
     * @param       {Object}    config  Model configuration
     */
    constructor(config)
    {
        this.$config = config;
        this._buildKeyModels();
    }

    /**
     * Dynamically builds model key values based on its type.
     * @private
     */
    _buildKeyModels()
    {
        const config = this._config;
        Object.keys(config).forEach(
            key =>
            {
                const value = config[key];
                value.name = key;
                this[key] = DataSandboxFactory.create(`DataSandboxModelsType${value.type}`, value);
            }
        );
    }

    /**
     * Returns this instance representation into plain object
     * @return  {Object}    Plain object
     */
    toJSON()
    {
        let json = {};
        Object.keys(this).forEach(key =>
        {
            if (key.charAt(0) !== '$')
            {
                json = Object.assign(json, this[key].toJSON());
            }
        });

        return json;
    }
};
