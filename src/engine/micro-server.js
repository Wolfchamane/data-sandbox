const http = require('http');
const pathReplace = require('../utils/_path-replace');

module.exports = class DataSandboxMicroServerEngine
{
    /**
     * @constructor
     * @param       {String}    hostname    Server hostname
     * @param       {Number}    port        Server execution port
     * @param       {Object}    config      Parsed server configuration
     */
    constructor(hostname = '127.0.0.1', port = 3000, config = null)
    {
        this.$config = config;
        this.$server = null;
        this.$basePath = '';
        this.hostname = hostname;
        this.port = port;

        this._runMicroServer();
    }

    /**
     * Executes this micro-server instance at `hostname:port`
     * @private
     */
    _runMicroServer()
    {
        /* eslint no-console: 0 */
        this.$server = http.createServer(this._parseRequest.bind(this));
        this.$server.listen(this.port, this.hostname, () => console.log(`Server running @ http://${this.hostname}:${this.port}`));
    }

    /**
     * Handles any request against this instance.
     * @param   {Object}    req Request performed
     * @param   {Object}    res Response to resolve
     * @private
     */
    _parseRequest(req, res)
    {
        let status = 400;
        let headerType = 'text/plain';
        let response = `404 Path ${req.url} not found`;

        const path = req.url.substr(1);
        if (this._pathExists(path))
        {
            headerType = 'application/json';
            status = 200;

            response = (path === this.$config.basePath)
                ? this.$config.getRawValue()
                : this.$config.getPathBaseValue(path);

            response = JSON.stringify(response, null, 4);
        }

        res.statusCode = status;
        res.setHeader('Content-Type', headerType);
        res.end(response);
    }

    /**
     * Evaluates if requested path exists or not
     * @return  {Boolean}   `true` if path exists for endpoint instance
     */
    _pathExists(req = '')
    {
        return this.$config.paths.some(
            path =>
            {
                path = pathReplace(path, /(:\w+)/g, this.$config.model);
                path = new RegExp(`^${path}$`);

                return path.test(req);
            }
        );
    }
};
