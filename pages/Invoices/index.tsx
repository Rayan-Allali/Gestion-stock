
import axios from 'axios'
import { useEffect, useState } from 'react'
import InvSale from '../../Componants/Tables/InvSale'

export default function Home() {
  const url='http://localhost:3000/api/invoice'
const [Data, setData] = useState<any>()
  
  useEffect(() => { 
   axios.get(url)
   .then(res => {
    setData(res.data.data)
   })
 }, [])
let unpaid=0;
// const countpaid=()=>{
//   for(let Invoice of Data){
//     if(Invoice.Rest>0) unpaid++
//   }
//   return unpaid
// // }
// unpaid=countpaid();
const Filtage=[{id:0,Title:'All Invoices',Nbr:Data?.length || 0},{id:1,Title:'Paid Invoice',Nbr:Data?.length-unpaid || 0},{id:2,Title:'Unpaid Invoice',Nbr:unpaid}]

  return (
    <>
   { Data &&  <InvSale   Data={Data} choices={Filtage}  title="Invoice"  ></InvSale>}
    </>
  )
}
