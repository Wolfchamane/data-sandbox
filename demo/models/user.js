module.exports = {
    id              : {
        key         : true,
        type        : 'String',
        format      : /\d{8}[A-Z]{1}/,
        random      : () =>
        {
            let value;
            while (value === undefined)
            {
                const number = Math.trunc(Math.floor(Math.random() * 99999999));
                const rest = number % 23;
                const letter = 'TRWAGMYFPDXBNJZSQVHLCKE';
                if (rest <= (letter.length - 1))
                {
                    value = `${number}${letter.charAt(rest)}`;
                }
            }

            return value;
        },
        validators  : [
            value => value.length,
            value =>
            {
                const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
                const letter = value.match(/[A-Z]/).pop();

                return letters.lastIndexOf(letter) !== -1;
            }
        ]
    },
    name            : {
        type        : 'String',
        random      : true
    },
    dob             : {
        type        : 'Date',
        random      : true
    }
};
