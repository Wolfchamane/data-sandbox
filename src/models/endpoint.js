const pathReplace = require('../utils/_path-replace');

/**
 * Instance to handle all related to any endpoint configured.
 * @namespace   data-sandbox.models
 * @class       data-sandbox.models.Endpoint
 */
module.exports = class DataSandboxModelsEndpoint
{
    /**
     * Returns this endpoint model configuration
     * @getter
     * @return {*}  Model configuration
     */
    get model()
    {
        return this.$config.model;
    }

    /**
     * Sets the value of `$basePath`
     * @setter
     * @param   {*} value New `$basePath` value.
     */
    set basePath(value)
    {
        this.$basePath = '';
    }

    /**
     * Returns the current value of `$basPath`
     * @getter
     * @return  {String}    Current value
     */
    get basePath()
    {
        return this.$basePath;
    }

    /**
     * Sets the value of `$paths`
     * @setter
     * @param   {*} value   New value
     */
    set paths(value)
    {
        this.$paths = value;
    }

    /**
     * Returns the current value of `$paths`
     * @getter
     * @return  {*|null}    Current value
     */
    get paths()
    {
        return this.$paths;
    }

    /**
     * @constructor
     * @param       {Object}    config  Endpoint configuration
     */
    constructor(config = null)
    {
        /**
         * Endpoint configuration
         * @property    $config
         * @protected
         * @type        {Object}
         */
        this.$config = config;

        /**
         * Map of available paths for this endpoint
         * @property    $paths
         * @protected
         * @type        {Array}
         * @default     null
         */
        this.$paths = null;

        /**
         * Base path for this endpoint
         * @property    $basePath
         * @protected
         * @type        {String}
         * @default     ''
         */
        this.$basePath = '';

        this._buildPaths();
    }

    /**
     * Builds all paths for this endpoint base on its model configuration
     * @private
     */
    _buildPaths()
    {
        this.$basePath = this.$config.path;
        this.paths = [this.$basePath];

        let key;
        Object.keys(this.$config.model).forEach(
            modelProp =>
            {
                const isKey = this.$config.model[modelProp].key;
                if (isKey)
                {
                    key = modelProp;
                    this.paths.push(`${this.$basePath}/:${modelProp}`);
                }
                else
                {
                    this.paths.push(`${this.$basePath}/:${key}/${modelProp}`);
                }
            }
        );
    }

    /**
     * Returns the whole value of this endpoint
     * @return  {*} Raw value
     */
    getRawValue()
    {
        return this.$config.value;
    }

    /**
     * Returns a filtered value base on request path
     * @param   {String}    path    Request path
     * @return  {Object}    Filtered value of {Error} object
     */
    getPathBaseValue(path = '')
    {
        const values = this._extractPathValues(path);

        let value = this.$config.value.find(
            item =>
            {
                let isMatch = true;
                Object.keys(values).forEach(
                    prop =>
                    {
                        isMatch = isMatch && item[prop].value === values[prop];
                    }
                );

                return isMatch ? item : undefined;
            }
        );

        if (!value)
        {
            value = {
                error       : 'Information not found',
                errorCode   : 500,
                path
            };
        }

        return value;
    }

    /**
     * Extracts a map of {property: value} from request path and this endpoint model configuration
     * @param   {String}    req Request path
     * @return  {Object}    Map of model properties and path values.
     * @private
     */
    _extractPathValues(req = '')
    {
        const values = {};
        this.paths.some(
            path =>
            {
                let aux = pathReplace(path, /(:\w+)/g, this.model);
                aux = new RegExp(`^${aux}$`);

                const doBreak = aux.test(req);

                if (doBreak)
                {
                    const _values = req.match(aux);
                    _values.shift();
                    path.match(/(:\w+)/g).forEach(
                        (match, index) =>
                        {
                            const prop = match.replace(':', '');
                            values[prop] = _values[index];
                        }
                    );
                }

                return doBreak;
            }
        );

        return values;
    }
};
