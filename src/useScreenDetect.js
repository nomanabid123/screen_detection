import React,{ useState,useEffect } from "react";

const breakPoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
}


const useDetectScreen = ()=>{
    const [screenSize,setScreenSize] = useState({
        width:window.innerWidth,
        height:window.innerHeight,
        breakPoint:'xl'
    })

    const [isMobile,setIsMobile] = useState(false)
    const [isTablet,setIsTablet] = useState(false)
    const [isLaptop,setIsLaptop] = useState(false)


 useEffect(() => {
    const getBreakpoint = (width) => {
      if (width < breakPoints.xs) return 'xs';
      if (width < breakPoints.sm) return 'sm';
      if (width < breakPoints.md) return 'md';
      if (width < breakPoints.lg) return 'lg';
      if (width < breakPoints.xl) return 'xl';
      return 'xxl';
    };

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(window.innerWidth),
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    if(screenSize.breakPoint=='xs' || screenSize.breakPoint=='sm')
        {setIsMobile(true)
         setIsLaptop(false)
         setIsTablet(false)
        }
    if(screenSize.breakPoint=='md'){
          {
         setIsMobile(false)
         setIsLaptop(false)
         setIsTablet(true)
        }
    }
     if(screenSize.breakPoint=='lg' || screenSize.breakPoint=='xl' || screenSize.breakPoint=='xxl' ){
          {
            setIsMobile(false)
            setIsLaptop(true)
            setIsTablet(false)
        }
    }


  },[screenSize])

  return { screenSize, isMobile, isTablet, isLaptop };

}

export default useDetectScreen;