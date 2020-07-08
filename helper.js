function sanitizeLink(input) {
    var tmp = ''
    tmp = input.replace('/', '-');
    tmp = tmp.replace(':', '-');
    return tmp;
}

module.exports = sanitizeLink;