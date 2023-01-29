import axios from "axios";
import { useEffect, useState } from "react";
import FilterElmnt from "../../Componants/Filter";
import SectionTitle from "../../Componants/SectionTitle";
import Element from  "../../Componants/TypeElement"


const Type = () => {
  const [Data, setData] = useState<any>()
  useEffect(() => { 
   axios.get(`http://localhost:3000/api/productType`)
   .then(res => {
    setData(res.data.data)
    console.log(Data);
   })
 }, [])

  return(
    <>
    {Data &&  
    <div>
      {  Data.map(data=>{
        return <Element  Nbr={52} {...data} ></Element>
      }) }
    </div> }
    </>
   
  );     
  
}
 
export default Type;