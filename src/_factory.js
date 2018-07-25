const $factories = {};

module.exports = class DataSandboxFactory
{
    static create(name = '', config = null)
    {
        let instance;
        if (this.exists(name))
        {
            instance = new $factories[name](config);
        }

        return instance;
    }

    static exists(name = '')
    {
        return $factories[name] !== undefined;
    }

    static register(name = '', constructor = null)
    {
        if (!this.exists(name))
        {
            $factories[name] = constructor;
        }
    }
};
