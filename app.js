/**
 * @param {object} input  
 * @param {object} values 
 */

const InvalidType = new Error('InvalidType');

function render(input, values) {
    if (typeof input !== 'object' || typeof values !== 'object')
        throw InvalidType;
    return htmlStringGenerator(input, values);
}
function putValues(string, values) {
    return string.replace(/\${(.*?)}/g, (match, key) => values[key] || match);
}

function htmlStringGenerator(input, values) {
    let HTMLString = '';
    for (const key in input) {
        const value = input[key];
        if (typeof value === 'string') {
            const modifiedValue = putValues(value, values);
            HTMLString += `<${key}>${modifiedValue}</${key}>`;
        }
        else if (typeof value === 'object') {
            HTMLString += `<${key}>${htmlStringGenerator(value, values)}</${key}>`;
        }
    }
    return HTMLString;
}

module.exports = {
    render
}
