const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

const tempFolder = path.join(cwd, 'temp');
if (!fs.existsSync(tempFolder))
{
    fs.mkdirSync(tempFolder);
}


module.exports = class am4Log
{
    constructor(date = null)
    {
        this._folder = tempFolder;
        this._logFile = `${date instanceof Date ? date.toISOString() : ''}.log`;
    }
};
