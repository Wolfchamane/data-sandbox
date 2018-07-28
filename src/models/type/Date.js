const DataSandboxModelsTypeBase = require('./_base');

/**
 * Handles date values
 * @namespace   data-sandbox.models.type
 * @class       data-sandbox.models.type.Date
 * @extends     data-sandbox.models.type.Base
 */
class DataSandboxModelsTypeDate extends DataSandboxModelsTypeBase
{
    /**
     * @constructor
     */
    constructor()
    {
        super(...arguments);
        this.type = 'Date';
    }

    /**
     * @override
     */
    _randomizeValue()
    {
        super._randomizeValue();

        if (!this.value)
        {
            const now = new Date();
            const min = 1900;
            let range = (now.getFullYear() - min);
            range = range + min;
            const day = Math.trunc(Math.round(Math.random() * 31));
            const month = Math.trunc(Math.round(Math.random() * 11));
            const year = Math.trunc(Math.round(Math.random() * range));

            this.value = new Date(year, month, day);
        }
    }
}

module.exports = DataSandboxModelsTypeDate;
