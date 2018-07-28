const DataSandboxFactory = require('../../_factory');

/**
 * @namespace   data-sandbox.models.type
 * @class       data-sandbox.models.type.Base
 * @requires    data-sandbox.factory
 */
class DataSandboxModelsTypeBase extends DataSandboxFactory
{
    /**
     * Sets any new value of `$$value`
     * @setter
     * @param   {*} newValue    New value
     */
    set value(newValue)
    {
        this.$$value = newValue;
    }

    /**
     * Returns the current value of `$$value`
     * @getter
     * @return  {*} Current value
     */
    get value()
    {
        return this.$$value;
    }

    /**
     * @constructor
     * @param       {*} config  Class configuration
     */
    constructor(config)
    {
        super();

        /**
         * Current model value.
         * @property    $$value
         * @type        {*}
         * @default     null
         * @protected
         * @private
         */
        this.$$value = null;

        /**
         * Array of value validators functions
         * @property    $$validators
         * @type        {Function[]}
         * @default     null
         * @protected
         * @private
         */
        this.$$validators = null;

        /**
         * Type of model
         * @property    type
         * @type        {*}
         * @default     null
         */
        this.type = null;

        /**
         * Flags if value should be created after initialization.
         * Could be:
         * - `true`: Value will be completely random and method `_randomizeValue` should be overrided
         * - `Array`: Value will be obtained from one of this array values
         * - `function`: Value will be generated through this function
         * @property    random
         * @type        {*}
         * @default     false
         */
        this.random = false;

        /**
         * Flags if this value is for a primary key or not.
         * @property    key
         * @type        {Boolean}
         * @default     false
         */
        this.key = false;

        /**
         * Regular expression to test this value
         * @property    format
         * @type        {RegExp}
         * @default     null
         */
        this.format = null;

        /**
         * Name reference of this value.
         * @property    name
         * @type        {String}
         * @default     ''
         */
        this.name = '';

        this._applyConfigValues(config);

        if (!this.value && this.random)
        {
            this._randomizeValue();
        }
    }

    /**
     * Applies class configuration values to this instance
     * @param   {Object}    config  Configuration
     * @private
     */
    _applyConfigValues(config = null)
    {
        if (config)
        {
            (Object.keys(config) || []).forEach(key =>
            {
                if (key.charAt(0) !== '$' && key.charAt(0) !== '_' && this.hasOwnProperty(key))
                {
                    this[key] = config[key];
                }
            });
        }

        if (config && Array.isArray(config.validators))
        {
            this.$$validators = config.validators;
        }
    }

    /**
     * Calculates a random value for this instance
     * @private
     */
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

    /**
     * Validates the current value of this instance
     * @return  {Boolean}   Whether value is valid or not
     */
    validate()
    {
        let isValid = true;
        (this.$$validators || []).forEach(fn =>
        {
            isValid = isValid && fn.call(this, this.value);
        });
        if (isValid && this.format)
        {
            isValid = this.format.test(this.value);
        }

        return isValid;
    }

    /**
     * Returns this item in a pair name-value object instance
     * @return  {Object}    Representation of this instance
     */
    toJSON()
    {
        const json = {};
        json[this.name] = this.value;

        return json;
    }
}

module.exports = DataSandboxModelsTypeBase;
