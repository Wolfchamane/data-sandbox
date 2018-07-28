const $factories = {};

/**
 * Provides static methods to register and create class instances
 * @namespace   data-sandbox
 * @class       data-sandbox.factory
 */
module.exports = class DataSandboxFactory
{
    /**
     * Returns an intance of the class, if was previously registered
     * @param   {String}    name    Name of the class
     * @param   {Object}    config  Configuration to apply
     * @return  {Object|undefined}  Instance
     */
    static create(name = '', config = null)
    {
        let instance;
        if (this.exists(name))
        {
            instance = new $factories[name](config);
        }

        return instance;
    }

    /**
     * Checks if class was registered previously
     * @param   {String}    name    Name of the class
     * @return  {Boolean}   `true` in case of being registered, `false` in any other case
     */
    static exists(name = '')
    {
        return $factories[name] !== undefined;
    }

    /**
     * Registers a new and unique instance constructor.
     * @param   {String}    name        Class name to be registered
     * @param   {Function}  constructor Class constructor
     */
    static register(name = '', constructor = null)
    {
        if (!this.exists(name))
        {
            $factories[name] = constructor;
        }
    }
};
