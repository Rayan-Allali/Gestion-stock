import axios from 'axios';
import { useEffect, useState } from 'react';

const usefetch=(url)=> {
    const [data, setData] = useState<any>()
    const get= ()=>{
          axios.get(url)
        .then(res => {
            setData(res.data.data);
        return {data} 
        })
    }
    useEffect( () => { 
        get()
      }, [])
}

export default usefetch