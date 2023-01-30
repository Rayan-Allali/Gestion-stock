import axios from 'axios';
import {motion,AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import PlusA from '../../public/Plus+.png' 
import NewAdd from '../../public/NewAdd.png' 
import { FiX } from "react-icons/fi";
import Image from 'next/image'
import Add from './Add';
import ProductElement from './ProductElement';
interface props{
    Title:string,
    setClicked:(value:boolean) => void
}


const AddInvSale:React.FC<props> = (props) => {
   const [AddClick, setAddClick] = useState(false)
   

   const [index,setindex]=useState(1);
   const [Added,setAdded]=useState(false);
   const [productAdded, setproductAdded] = useState([0])
   const AddProduct=()=>{
      setindex(index+1)
      setproductAdded([...productAdded,index])
      console.log(index);
      console.log(productAdded);
      
      
   }
   let Type:any={};
   // let  url='http://localhost:3000/api/product'

    Type={  img:"tst",
    nomP: "",
    designation:"",
    type: "",}
  const [data, setdata] = useState( Type )
     const handleChange = (event:any,attrb: number) => {
      switch (attrb) {
         case 1:
         data.nomP  = event.target.value
            break;
         case 2:
         data.designation  = event.target.value
            break;
         case 3:
         data.type  = event.target.value
          break;}
      }
    
   const handleSubmit = () => {  
      //   axios.post(url,data)
      //   .then(res => {
      //     console.log(res);
      //     console.log(res.data);
      //     console.log('Successful');
      //     location.reload();
      //   })
   }


   
   const [Customers, setCustomers] = useState(false)
   const [CustomerField, setCustomerField] = useState<any>()
   const [CustomersData, setCustomersData] = useState<any>()

   const [Products, setProducts] = useState(false)
   const [ProductField, setProductField] = useState<any>([])
   const [ProductsData, setProductsData] = useState<any>()

   const handleFocus=(Type:Number,e,id?:number)=>{
// Type=0 means Customer or supplier 1 means Product
    if(Type==0){
    axios.get(`http://localhost:3000/api/customer`)
   .then(res => {
   setCustomersData(res.data.data)})
   setCustomers(true)
    }
    else {      e.preventDefault();
      setTimeout(() => {
         axios.get(`http://localhost:3000/api/product`)
         .then(res => {
       
            setProductsData(res.data.data)
            setProducts(true) 
             console.log("prod:",ProductsData);
         })
            
      }, 800);
    
         // let State=[false]
         // for(let i=1;i<Products.length;i++){
         //    State.push(false)
         // }
         // State[id]=true
         // setProducts(State)
    }
   }  
   
   const handleBlur=(Type:Number,e)=>{
      // Type=0 means Customer or supplier 1 means Product
      if(Type==0){
         setTimeout(() => {
            setCustomers(false)
         }, 400);
      }
      else {}
         }  

   async function SaveClicked() {
     await handleSubmit() 
     setAdded(true) 
     setTimeout(() => {
      props.setClicked(false) 
     }, 400);
     
   }
    return ( 
    <motion.div  className="w-[650px] max-h-[510px] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] shadow-2xl font-semibold
    rounded-[10px] mb-10 bg-white p-6 text-[#b0b1b3] " 
    initial={{ y: '-200%',x: '50%',opacity: 0 }}
    animate={{ y: '-55%',x: '50%', opacity: 1 }} 
    exit={{ y: '-200%',x: '50%',opacity: 0 , }}
    transition={{ type: "spring", stiffness: 60,delay:.5 }}
     >
    <div  className='flex justify-between' >
    <h1  className="text-xl text-black font-semibold ">New {props.Title}</h1>  
    <div className='rounded-full bg-[#ff0000b7] hover:bg-[red] duration-[.5s] text-white text-xl w-[30px] h-[30px] grid justify-center cursor-pointer items-center' 
    onClick={()=>props.setClicked(false)}> 
    <FiX></FiX></div>
    </div>
        <form >
        <div className="flex flex-col items-center w-full my-6 gap-8 ">
        <div className="relative">
           <Image src={NewAdd} className="absolute h-[20px] cursor-pointer w-[20px] translate-y-[-50%] top-[50%] left-5 " alt=""
           onClick={()=>setAddClick(true)}
           ></Image>
            <input type="text" onFocus={(e)=>{handleFocus(0,e)}} value={CustomerField &&  CustomerField?.nomC + ' '+CustomerField?.prenomC}
             onBlur={(e)=>{handleBlur(0,e)}} onChange={(e)=>handleChange(e,1)} placeholder="Select Customer" 
            className=" pl-[30%] rounded-[5px] w-[300px] h-[40px] border border-solid border-[#a6a7a8] " />
         {  Customers && <div  className='border border-solid text-black border-black absolute bottom-[-400%] w-[300px] overflow-y-scroll h-[150px] max-h-[150px] bg-white ' >
                    {CustomersData  && CustomersData.map(Data=>{
                     return <div  className='flex p-2 cursor-pointer gap-1 border-b-solid border-b border-b-black' key={Math.random()}
                     onClick={()=>{setCustomerField(prev=>prev=Data);  }}> 
                            <p>N° {Data.codeC} </p> 
                            <p> {Data.nomC} </p>
                            <p> {Data.prenomC} </p>
                          </div>
                    }) }
           </div> }
         </div>
         <div className='max-h-[210px] overflow-y-scroll grid gap-4'>
         {productAdded.map(product=>{
            return     <ProductElement Products={Products} ProductsData={ProductsData} setProductField={setProductField}
             handleBlur={handleBlur} handleChange={handleChange} handleFocus={handleFocus} product={product}  ></ProductElement>
           
         })}
         </div>
   
        <div  className="w-[120px] h-[38px] bg-[#F1F4FB] rounded-[5px] cursor-pointer text-[#017AFF] text-[13px] flex justify-center 
            gap-2 items-center self-start  " onClick={()=>AddProduct()} > 
            <Image src={PlusA} alt=""></Image> Add product  </div>
        </div>
        </form>
        <div className="flex w-full justify-end px-3 gap-4">
            <button  className="text-black p-2 px-7 rounded-[5px] border border-solid border-[#a6a7a8] hover:bg-[#f7f2f2]
             hover:border-[#818181] duration-[.5s] "  onClick={()=>props.setClicked(false)} >Clear</button>
            <button type='submit' className="bg-[#666cde] text-white p-2 duration-[.5s] px-7 rounded-[5px] hover:bg-[#6167d3] " 
            onClick={()=>{SaveClicked()}}   >Save</button>
        </div>
        <AnimatePresence>
        { Added &&
  <motion.div className="absolute bottom-[-13%] right-[50%] translate-x-[50%] bg-white rounded-[5px] gap-3 border-l-[3px]
   border-l-solid border-l-[#666cde] w-[180px] items-center justify-center flex h-[45px] text-black "
   initial={{ opacity: 0, y:40 }}
        animate={{ opacity: 1,y:0 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.3, }}
   >
    <div className="rounded-full bg-[#666cde] text-white h-[20px] w-[20px] grid justify-center items-center  ">
    <AiOutlineCheck></AiOutlineCheck> 
    </div>
    {props.Title}   Added
  </motion.div>
        }
        </AnimatePresence>
        <AnimatePresence>
        {AddClick &&  <motion.div   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.5, }}
        >
         <Add Title={props.Title=="Invoice" ? "Supplier"  : "Customer" }  setClicked={setAddClick} ></Add>
         </motion.div> }
         </AnimatePresence>     
    </motion.div> );
}
 
export default AddInvSale;