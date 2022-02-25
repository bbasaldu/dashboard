import { useEffect, useState } from 'react'
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false)
    
    useEffect(() => {
        const onResize = () => {
            const media = window.matchMedia(query)
            if(media.matches !== matches){
                setMatches(media.matches)
            }
        }
        window.addEventListener('resize', onResize)
        onResize()
    }, [matches, query])
    return matches
}
export default useMediaQuery