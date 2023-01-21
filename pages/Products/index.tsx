
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProduitStock from '../../Componants/Tables/ProduitStock'

export default function Home() {
  const [Data, setData] = useState<any>()
  useEffect(() => { 
    axios.get(`http://localhost:3000/api/product`)
    .then(res => {
     setData(res.data.data)})
  }, [])
 
  return (
    <>
    {Data &&  <ProduitStock   Data={Data}  title="Product"  ></ProduitStock> }   
    </>
  )
}
