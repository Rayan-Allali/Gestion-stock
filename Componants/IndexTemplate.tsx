import SupCus from './Tables/SupCusTable'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer';
import Add from './Add/Add';
import SideNavbar from './SideNvar/SideNav';
import Navbar from './Navbar';
import ProduitStock from './Tables/ProduitStock';
import InvSale from './Tables/InvSale';
import AddProductStock from './Add/AddProductStock';
import AddInvSale from './Add/AddInvSale';


interface props{
  title:string;
  Type:string;
  url:string;
  Filter:boolean
}

 const IndexTeplate:React.FC<props>=(props)=>{

const [Data, setData] = useState<any>()
const [AddClick, setAddClick] = useState(false)

let State=[false,false,false,false,false,false,false,false]
switch (props.title) {
  case "Product":
      State[1]=true
      break; 
      case "Customer":
        State[2]=true
        break; 
        case "Supplier":
          State[3]=true
          break;  
          case "Sale":
            State[4]=true
            break; 
  case "Stock":
    State[5]=true
    break;
    case "Invoice":
      State[6]=true
      break;
      
            State[4]=true
            break;
}
let Filtage=null
props.Filter ? Filtage=[{id:0,Title:`All ${props.title} `,Nbr:50},{id:1,Title:`Active ${props.title} `,Nbr:30},{id:2,Title:`Inactive ${props.title} `,Nbr:20}]
 : Filtage=null;

 useEffect(() => { 
  AddClick==false &&
 setTimeout(() => {
  setData(null)
  axios.get(props.url)
  .then(res => {
   setData(res.data.data)})
   console.log(Data);
 }, 800); 
}, [AddClick])

 return (
  <div className='grid grid-cols-[230px,1fr] relative w-full'>
       <SideNavbar State={State} className={` col-span-1 ` }  />
       <div   className=" col-start-[2] col-end-[3] ">
  <Navbar/>
  { props.Type=="CS" && Data  &&  <SupCus  setAddClick={setAddClick} Data={Data} choices={Filtage} title={props.title}  ></SupCus>}
  { props.Type=="PS" && Data  &&  <ProduitStock  setAddClick={setAddClick} Data={Data} choices={Filtage} title={props.title}  ></ProduitStock>}
  { props.Type=="IS" && Data  &&  <InvSale  setAddClick={setAddClick} Data={Data} choices={Filtage} title={props.title}  ></InvSale>}
     </div>
    <AnimatePresence>
        {AddClick &&  <motion.div className='w-[calc(100vw-230px)] z-10 h-[calc(100vh-122px)] fixed bg-[#3b373713] left-[230px]  top-[122px] '   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.5, }}>
          { props.Type=="CS" && <Add Title={props.title}  setClicked={setAddClick} ></Add> }
          { props.Type=="PS" && <AddProductStock Title={props.title}  setClicked={setAddClick} ></AddProductStock> }
          { props.Type=="IS" && <AddInvSale Title={props.title}  setClicked={setAddClick} ></AddInvSale> }
         </motion.div> }
    </AnimatePresence>
    </div>
  )
}
export default IndexTeplate