import { useEffect, useState } from "react";
import { isScrolledIntoView } from "../components_old/general/usefulFunctions";

const useIsVisible = (containerRef) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const onVisibleChange = () => {
      if (isScrolledIntoView(containerRef.current)) {
        window.removeEventListener("scroll", onVisibleChange);
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", onVisibleChange);
    onVisibleChange();
  }, [containerRef]);
  return isVisible;
};
export default useIsVisible;
