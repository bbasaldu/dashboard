
export const isScrolledIntoView = (el) => {
    const rect = el.getBoundingClientRect();
    //var elemTop = rect.top;
    const elemBottom = rect.bottom;
    const threshold = elemBottom - rect.height/2
    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //const isVisible = elemTop < window.innerHeight && elemBottom >= 0;

    //only bottom works better imo
    const isVisible = (threshold <= window.innerHeight);
    return isVisible;
}
export const getElemBBox = (svg, text) => {
    const temp = svg.append("text").text(text);
  
    const dim = temp.node().getBoundingClientRect();
    temp.remove();
    return dim;
  };