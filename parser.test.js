const parser = require('./parser');

test('three links', () => {
    let demoInput = "[[Link1]]\n[[Link2]]\n[[Link3]]";
    expect(parser.getNestedLinks(demoInput).length).toEqual(3);
})

test('wiki-link in code', () => {
    let demoInput = "```console.log('Hello World');\n#[[comment-in-code]]\n```";
    expect(parser.getNestedLinks(demoInput).length).toEqual(0);
})

test('Tag in text - Replace', () => {
    let demoInput = "Some text\n#Biases\nLorem ipsum";
    let demoResult = "Some text\n#[[Biases]]\nLorem ipsum";
    expect(parser.replaceTagsWithLinks(demoInput)).toEqual(demoResult);
})

test('Tag in text - Replace2', () => {
    let demoInput = "Some text\n#Tag\nLorem ipsum";
    let demoResult = "Some text\n#[[Tag]]\nLorem ipsum";
    expect(parser.replaceTagsWithLinks(demoInput)).toEqual(demoResult);
})

test('Tag in text - Replace3', () => {
    let demoInput = "https://twitter.com/ValaAfshar/status/1279109283947388928\n#Biases";
    let demoResult = "https://twitter.com/ValaAfshar/status/1279109283947388928\n#[[Biases]]";
    expect(parser.replaceTagsWithLinks(demoInput)).toEqual(demoResult);
})

test('Tag in text - Replace4', () => {
    let demoInput = "#[[Quick Capture]]";
    let demoResult = "#[[Quick Capture]]";
    expect(parser.replaceTagsWithLinks(demoInput)).toEqual(demoResult);
})

test('Tag in text - Links', () => {
    let demoInput = "Some text\n#Biases\nLorem ipsum";
    expect(parser.getNestedLinks(parser.replaceTagsWithLinks(demoInput)).length).toEqual(1);
})

test('Tag in code', () => {
    let demoInput = "```console.log('Hello World');\n#comment-in-code\n";
    expect(parser.replaceTagsWithLinks(demoInput)).toEqual(demoInput);
})

