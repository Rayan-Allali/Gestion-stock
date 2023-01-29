import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ProduitStock from '../../Componants/Tables/ProduitStock'

const Id = () => {
    const router = useRouter()
    const pid = router.query.id
    const [Data, setData] = useState<any>()
    const [AddClick, setAddClick] = useState(false)
  useEffect(() => { 
   axios.get(`http://localhost:3000/api/sale/${pid}`)
   .then(res => {
    setData(res.data.data)
    console.log(res.data.data);
   })
 }, [])
    
    return ( 
   Data && <div   >HHHHH</div> );
}
 
export default Id;