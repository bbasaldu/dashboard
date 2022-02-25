//get dimendions of text by adding it to svg,
//getting the bbox,
//and then removing the text node and returing the bbox
export const getTextBBox = (svg, text) => {
  const svgText = svg.append("text").text(text);
  const bbox = svgText.node().getBoundingClientRect();
  svgText.remove();
  return bbox;
};
//gets longest tick from array of ticks
export const getLongestTick = (ticks) => {
  let longestTick = "";
  ticks.forEach((tick) => {
    const tickString = `${tick}`;
    if (tickString.length > longestTick.length) {
      longestTick = tickString;
    }
  });
  return longestTick;
};

export const isScrolledIntoView = (el) => {
  const rect = el.getBoundingClientRect();
  //var elemTop = rect.top;
  const elemBottom = rect.bottom;
  const threshold = elemBottom - rect.height / 2;
  // Only completely visible elements return true:
  //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //const isVisible = elemTop < window.innerHeight && elemBottom >= 0;

  //only bottom works better imo
  const isVisible = threshold <= window.innerHeight;
  return isVisible;
};
//used this function to help me out
//https://javascript.info/coordinates
export const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
};
