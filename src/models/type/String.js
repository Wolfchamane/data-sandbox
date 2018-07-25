const DataSandboxModelsTypeBase = require('./_base');

class DataSandboxModelsTypeString extends DataSandboxModelsTypeBase
{
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
            this.value = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(this.minLength, this.maxLength);
        }
    }
}

module.exports = DataSandboxModelsTypeString;
