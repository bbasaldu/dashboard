import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
const useMediaQuery = (query) => {
    const resized = useSelector(state => state.resizeState.resized)
    const [matches, setMatches] = useState(false)
    useEffect(() => {

        const media = window.matchMedia(query)
        if(media.matches !== matches){
            setMatches(media.matches)
        }
    }, [query, matches, resized])
    return matches
}
export default useMediaQuery