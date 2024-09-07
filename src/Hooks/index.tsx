import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const useGetQuery = (name: string,back=false,route='/') => {
    const nav=useNavigate();
    
      const [param, setParams] = useState<any>("");
      const location=useLocation();
      useEffect(() => {
        if(name !=""){
          const queryParams = new URLSearchParams(location.search);
          const setValue = queryParams.get(name);
          if(setValue==null){
            setParams("NOTFOUND")
            if(back)nav(route);
          };
          setParams(setValue )
        }
      }, [name,window.location.href]);
      return([param])
    };
    
    export const useGetWindowAvailSize=()=>{
      const [windowwidth, setWindow] = useState(getWindowSize())
      useEffect(() => {
        function handleWindowResize() {
          setWindow(getWindowSize() );
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);
      return windowwidth
  
    }

    function getWindowSize() {
      const {innerWidth, innerHeight} = window;
      return { width:innerWidth, height:innerHeight};
    }