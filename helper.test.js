// import 'jest';
// import { sanitizeLink } from './helper.js';
const sanitizeLink = require('./helper');

test('', () => {
    let demoInput = "B: Demo Input";
    expect(sanitizeLink(demoInput)).toEqual('B- Demo Input');
})

test('', () => {
    let demoInput = "Writing/Schreiben";
    expect(sanitizeLink(demoInput)).toEqual('Writing-Schreiben');
})
