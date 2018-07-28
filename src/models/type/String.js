const DataSandboxModelsTypeBase = require('./_base');

/**
 * Handles string values.
 * @namespace   data-sandbox.models.type
 * @class       data-sandbox.models.type.String
 * @extends     data-sandbox.models.type.Base
 */
class DataSandboxModelsTypeString extends DataSandboxModelsTypeBase
{
    /**
     * @constructor
     */
    constructor()
    {
        super(...arguments);
        this.type = 'String';
        this.minLength = 0;
        this.maxLength = 255;
    }

    /**
     * @override
     */
    _randomizeValue()
    {
        super._randomizeValue();
        if (!this.value)
        {
            this.value = Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(this.minLength, this.maxLength);
        }
    }
}

module.exports = DataSandboxModelsTypeString;
