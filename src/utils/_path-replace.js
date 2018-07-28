/* eslint arrow-body-style : 0 */

/**
 * Replaces all matches of {exp} on {path} with {data} values
 * @param   {String}    path    Request path to parse
 * @param   {RegExp}    exp     Regular expression for replace with
 * @param   {Object}    data    From where to obtain value
 * @return  {String}    Parsed path.
 */
module.exports = (path, exp, data) =>
{
    return path.replace(
        exp,
        match =>
        {
            let value = match;
            const prop = match.replace(':', '');
            if (data.hasOwnProperty(prop))
            {
                const config = data[prop];
                if (config.format)
                {
                    value = `(${config.format.source})`;
                }
            }

            return value;
        }
    );
};
