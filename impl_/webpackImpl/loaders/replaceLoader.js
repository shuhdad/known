const { getOptions } = require('loader-utils')
const mime = require('mime-types')
const path = require("path")
function replaceLoader(content) {
    const options = getOptions(this) || {};
    const { resourcePath } = this;
    const resolvedMimeType = mime.contentType(path.extname(resourcePath))
    const mimetype = resolvedMimeType.replace(/;\s+charset/i, ';charset');
    const encoding = getEncoding(options.encoding);

    if (typeof content === 'string') {
        // eslint-disable-next-line no-param-reassign
        content = Buffer.from(content);
    }
    const encodedData = getEncodedData(
        options.generator,
        mimetype,
        encoding,
        content,
        resourcePath
    );

    const esModule =
      typeof options.esModule !== 'undefined' ? options.esModule : true;

    const result = `${esModule ? 'export default' : 'module.exports ='
        } ${JSON.stringify(encodedData)}`
    console.log('result: ', result);
    return content
}


function getEncodedData(generator, mimetype, encoding, content, resourcePath) {
    if (generator) {
        return generator(content, mimetype, encoding, resourcePath);
    }

    return `data:${mimetype}${encoding ? `;${encoding}` : ''},${content.toString(
        // eslint-disable-next-line no-undefined
        encoding || undefined
    )}`;
}


function getEncoding(encoding) {
    if (typeof encoding === 'boolean') {
        return encoding ? 'base64' : '';
    }

    if (typeof encoding === 'string') {
        return encoding;
    }

    return 'base64';
}


module.exports = replaceLoader
module.exports.raw = true;
