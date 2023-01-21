import axios from 'axios'
import { useEffect, useState } from 'react'
import SupCus from '../../Componants/Tables/SupCusTable'

export default function Home() {
const [Data, setData] = useState<any>()
  useEffect(() => { 
    axios.get(`http://localhost:3000/api/supplier`)
    .then(res => {
     setData(res.data.data)})
  }, [])
 
 return (
    <>
     { Data && <SupCus   Data={Data} title="Supplier"  ></SupCus>}
    </>
  )
}
