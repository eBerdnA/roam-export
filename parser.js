// could probably be done much faster with a proper parser etc, but seems to work
const getNestedLinks = (text) => {
    let links = [];
    let state = "normal"; // 'seenOne'
    let counter = 0;
    let currentLinks = [];
    text.split("").forEach((char) => {
      currentLinks.forEach((x, i) => (currentLinks[i] += char));
      if (state === "seenOne" && char !== "[") {
        state = "normal";
      }
      if (state === "seenOneOut" && char !== "]") {
        state = "normal";
      }
      if (char === "[") {
        counter += 1;
        if (state === "seenOne") {
          currentLinks.push("");
          state = "normal";
        } else if (state === "normal") {
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
          state = "normal";
        } else if (state === "normal") {
          state = "seenOneOut";
        }
  
        if (counter === 0) {
          state = "normal";
        }
      }
    });
    return links;
  };

  exports.getNestedLinks = getNestedLinks;