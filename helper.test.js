const helper = require('./helper');

test('', () => {
    let demoInput = "B: Demo Input";
    expect(helper.sanitizeLink(demoInput)).toEqual('B- Demo Input');
})

test('', () => {
    let demoInput = "Writing/Schreiben";
    expect(helper.sanitizeLink(demoInput)).toEqual('Writing-Schreiben');
})
