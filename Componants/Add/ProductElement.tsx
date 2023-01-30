interface props{
    handleFocus:(Type: Number, e: any, id?: number) => void,
    handleChange: (event: any, attrb: number) => void,
    handleBlur: (Type: Number, e: any) => void;
    ProductsData: any,
    product: number,
    Products: boolean,
    setProductField: (value: any) => void
}


const ProductElement:React.FC<props> = (props) => {
    return ( 
    <div className='flex gap-4' key={Math.random()} >
        <div>
        <input type="text"  onFocus={(e)=>{props.handleFocus(1,e,props.product)}}    onBlur={(e)=>{props.handleBlur(0,e)}}
        onChange={(e)=>props.handleChange(e,2)} placeholder="Select Product" className=" pl-[15%] rounded-[5px] w-[270px] h-[40px] border border-solid border-[#a6a7a8] " />
        {  props.Products && <div  className='border border-solid text-black border-black absolute bottom-[-400%] w-[300px] overflow-y-scroll h-[150px] max-h-[150px] bg-white ' >
             {props.ProductsData  && props.ProductsData.map(Data=>{
              return <div  className='flex p-2 cursor-pointer gap-1 border-b-solid border-b border-b-black' key={Math.random()}
              onClick={()=>{props.setProductField(prev=>prev=Data);  }}> 
                     <p>N° {Data.codeP} </p> 
                     <p> {Data.nomP} </p>
                     <p> QteAchat : {Data.qteAchat} </p>
                     <p> QteVent : {Data.qteVendu} </p>
                   </div>
             }) }
    </div> }
        </div>
     <div className="">
        <input type="text" onChange={(e)=>props.handleChange(e,3)} placeholder="PrixUt"   className="  pl-[15%] rounded-[5px] w-[90px] h-[40px] border border-solid border-[#a6a7a8] " />
     </div>
     <div className="">
        <input type="text"  onChange={(e)=>props.handleChange(e,2)} placeholder="PrixVt" className=" pl-[15%] rounded-[5px] w-[90px] h-[40px] border border-solid border-[#a6a7a8] " />
     </div>
     <div className="">
        <input type="text" onChange={(e)=>props.handleChange(e,3)} placeholder="Qte"   className="  pl-[15%] rounded-[5px] w-[90px] h-[40px] border border-solid border-[#a6a7a8] " />
     </div>
  </div> 
        
     );
}
 
export default ProductElement;