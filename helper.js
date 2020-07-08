const sanitizeLink = (input) => {
    var tmp = ''
    tmp = input.replace('/', '-');
    tmp = tmp.replace(':', '-');
    return tmp;
}

exports.sanitizeLink = sanitizeLink;