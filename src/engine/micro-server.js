const http = require('http');

module.exports = class DataSandboxMicroServerEngine
{
    constructor(hostname = '127.0.0.1', port = 3000, config = null)
    {
        this.hostname = hostname;
        this.port = port;
        this.$config = config;
        this._server = null;

        this._runMicroServer();
    }

    _runMicroServer()
    {
        this._server = http.createServer(this._parseRequest.bind(this));
        this._server.listen(this.port, this.hostname, () => console.log(`Server running @ http://${this.hostname}:${this.port}`));
    }

    _parseRequest(req, res)
    {
        let status = 400;
        let headerType = 'text/plain';
        let response = `404 Path ${req.url} not found`;

        const endpoint = this.$config.path === req.url.substr(1) && this.$config.methods.includes(req.method)
            ? this.$config
            : null;
        if (endpoint)
        {
            headerType = 'application/json';
            status = 200;
            response = JSON.stringify(endpoint.value, null, 4);
        }

        res.statusCode = status;
        res.setHeader('Content-Type', headerType);
        res.end(response);
    }
};
