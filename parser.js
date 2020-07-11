// could probably be done much faster with a proper parser etc, but seems to work
const getNestedLinks = (text) => {
    let links = [];
    let state = "normal"; // 'seenOne'
    let counter = 0;
    let currentLinks = [];
    text.split("").forEach((char) => {
      if (char === '`' && state === stateNormal) {
        state = firstStart;
        return;
      }
      if (char === '`' && state === firstStart) {
        state = secondStart;
        return;
      }
      if (char === '`' && state === secondStart) {
        state = thirdStart;        
        return;
      }
      if (char === '`' && state === thirdStart) {
        state = firstEnd;
        return;
      }
      if (char === '`' && state === firstEnd) {
        state = secondEnd;
        return;
      }
      if (char === '`' && state === secondEnd) {
        state = stateNormal;
        return;
      }
      currentLinks.forEach((x, i) => (currentLinks[i] += char));
      if (state === "seenOne" && char !== "[") {
        state = stateNormal;
      }
      if (state === "seenOneOut" && char !== "]") {
        state = stateNormal;
      }
      if (char === "[") {
        counter += 1;
        if (state === "seenOne") {
          currentLinks.push("");
          state = stateNormal;
        } else if (state === stateNormal) {
          state = "seenOne";
        }
      }
      if (char === "]" && counter > 0) {
        counter -= 1;
        if (state === "seenOneOut") {
          const l = currentLinks.pop();
          if (l) {
            links.push(l.slice(0, -2));
          }
          state = stateNormal;
        } else if (state === stateNormal) {
          state = "seenOneOut";
        }
  
        if (counter === 0) {
          state = stateNormal;
        }
      }
    });
    return links;
  };

const stateNormal = "normal";
const firstStart = "firstStart";
const secondStart = "secondStart";
const thirdStart = "thirdStart";
const firstEnd = "firstEnd";
const secondEnd = "secondEnd";
const thirdEnd = "thirdEnd";
const startTag = "startTag";
const codeBlockState = "inCodeBlock";
const tagBlockState = "inTagBlock";

const replaceTagsWithLinks = (text) => {
  let state = stateNormal;
  let result = '';
  let secondState = '';
  let lastChar = '';
  text.split("").forEach((char) => {
    // Code blocks start
    if (char === '`' && state === stateNormal) {
      state = firstStart;
      result = result.concat(char);
      return;
    }
    if (char === '`' && state === firstStart) {
      state = secondStart;
      result = result.concat(char);
      return;
    }
    if (char === '`' && state === secondStart) {
      state = thirdStart;
      secondState = codeBlockState;
      result = result.concat(char);
      return;
    }    
    if (char === '`' && state === thirdStart) {
      state = firstEnd;
      result = result.concat(char);
      return;
    }
    if (char === '`' && state === firstEnd) {
      state = secondEnd;
      result = result.concat(char);
      return;
    }
    if (char === '`' && state === secondEnd) {
      state = stateNormal;
      secondState = '';
      result = result.concat(char);
      return;
    }
    if (char !== '`' && state === thirdStart) {
      result = result.concat(char);
      return;
    }
    if (state !== stateNormal && secondState === codeBlockState && char !== '`') {
      state = stateNormal;
      result = result.concat(char);
      return;
    }
    // Code blocks end

    // Tags start
    if (state === stateNormal && char === '#') {
      // result = result.concat(char);
      // result = result.concat("[[");
      state = startTag;
      lastChar = char;
      secondState = tagBlockState;
      return;
    }

    if (secondState == tagBlockState && lastChar === '#') {
      if (char === '[') {
        result = result.concat(lastChar);
        result = result.concat(char);
        secondState = '';
        state = stateNormal;
        return;
      } else {
        result = result.concat(lastChar);
        result = result.concat("[[");
        result = result.concat(char);
        lastChar = '';
        return;
      }
    }

    if (state === startTag && ( char === ' ' || char === '\n') ) {
      result = result.concat("]]");
      state = stateNormal;
      secondState = '';
      result = result.concat(char);
      return;
    }
    if (secondState === tagBlockState && char === '<') {
      result = result.concat("]]");
      state = stateNormal;
      secondState = '';
      result = result.concat(char);
      return;
    }
    if (secondState === tagBlockState && char !== '#') {
      result = result.concat(char);
      return;
    }
    // Tags end
    if (state === stateNormal) {
      result = result.concat(char);
      return;
    }
  })
  if (state !== stateNormal) {
    if (secondState === tagBlockState) {
      result = result.concat("]]");
      state = stateNormal;
      secondState = '';
    }
  }
  return result;
}

exports.getNestedLinks = getNestedLinks;
exports.replaceTagsWithLinks = replaceTagsWithLinks;