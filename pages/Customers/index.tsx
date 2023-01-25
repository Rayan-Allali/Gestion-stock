
import SupCus from '../../Componants/Tables/SupCusTable'
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {

const [Data, setData] = useState<any>()
 const Filtage=[{id:0,Title:'All Customers',Nbr:50},{id:1,Title:'Active Customers',Nbr:30},{id:2,Title:'Inactive Customers',Nbr:20}]
 
 useEffect(() => { 
  axios.get(`http://localhost:3000/api/customer`)
  .then(res => {
   setData(res.data.data)
  })
}, [])
 return (
    <>
    { Data  && <SupCus Data={Data} choices={Filtage} title="Customer"  ></SupCus>}
    </>
  )
}
