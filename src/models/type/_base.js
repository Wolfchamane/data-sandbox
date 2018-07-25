const DataSandboxFactory = require('../../_factory');

class DataSandboxModelsTypeBase extends DataSandboxFactory
{
    set value(newValue)
    {
        this.$$value = newValue;
    }

    get value()
    {
        return this.$$value;
    }

    constructor(config)
    {
        super();

        this.$$value = null;
        this.$$validators = null;
        this.type = null;
        this.random = false;
        this.key = false;
        this.format = null;
        this.name = null;

        this._applyConfigValues(config);

        if (!this.value && this.random)
        {
            this._randomizeValue();
        }
    }

    _applyConfigValues(config = null)
    {
        if (config)
        {
            (Object.keys(config) || []).forEach(key => {
                if (key.charAt(0) !== '$' && key.charAt(0) !== '_' && this.hasOwnProperty(key)) {
                    this[key] = config[key];
                }
            });
        }

        if (config && Array.isArray(config.validators))
        {
            this.$$validators = config.validators;
        }
    }

    _randomizeValue()
    {
        if (Array.isArray(this.random))
        {
            const index =  Math.trunc(Math.random() * (this.random.length - this.min) + this.min);
            if (index <= this.random.length)
            {
                this.value = this.random[index];
            }
        }

        if (typeof this.random === 'function')
        {
            this.value = this.random();
        }
    }

    validate()
    {
        let isValid = true;
        (this.$$validators || []).forEach(fn => {
            isValid = isValid && fn.call(this, this.value);
        });
        if (isValid && this.format) {
            isValid = this.format.test(this.value);
        }
        return isValid;
    }

    toJSON()
    {
        return this.$$value;
    }
}

module.exports = DataSandboxModelsTypeBase;
