const DataSandboxModelsTypeBase = require('./_base');

class DataSandboxModelsTypeDate extends DataSandboxModelsTypeBase
{
    constructor()
    {
        super(...arguments);
        this.type = 'Date';
    }

    _randomizeValue()
    {
        super._randomizeValue();

        if (!this.value)
        {
            const day = Math.trunc(Math.round(Math.random() * 31));
            const month = Math.trunc(Math.round(Math.random() * 11));
            const year = Math.trunc(Math.round(Math.random() * 1900));

            this.value = new Date(year, month, day);
        }
    }
}

module.exports = DataSandboxModelsTypeDate;
