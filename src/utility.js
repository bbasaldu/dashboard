//get dimendions of text by adding it to svg,
//getting the bbox,
//and then removing the text node and returing the bbox
export const getTextBBox = (svg, text) => {
    const svgText = svg.append('text')
        .text(text)
    const bbox = svgText.node().getBoundingClientRect()
    svgText.remove()
    return bbox
}
//gets longest tick from array of ticks
export const getLongestTick = (ticks) => {
    let longestTick = ''
    ticks.forEach(tick => {
        const tickString = `${tick}`
        if(tickString.length > longestTick.length){
            longestTick = tickString
        }
    })
    return longestTick
}