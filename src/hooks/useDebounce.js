import { useEffect, useState } from "react";
function useDebounce(value,deplay) {
    const [debounceValue,setDebounceValue] = useState(value)
    useEffect(()=>{
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, deplay);
        return ()=> clearTimeout(handler)
    },[value])
    return debounceValue;
}

export default useDebounce;