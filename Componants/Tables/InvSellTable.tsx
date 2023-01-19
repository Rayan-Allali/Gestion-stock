import {useEffect, useState} from 'react';
import customersA from '../../public/customers+.svg'
import SupplierA from '../../public/Suppliers+.svg'
import Modifier from '../../public/Modifier.svg'
import Delete from '../../public/Delete.svg'
import Plus from '../../public/Plus.svg'
import LeftArrow from '../../public/LeftArrow.svg'
import RightArrow from '../../public/RightArrow.svg'
import CloseSearch from '../../public/CloseSearch.svg'
import Image, { StaticImageData } from 'next/image'
import FilterElmnt from '../Filter';
interface props{
  title:string,
  choices: { id:number, Nbr: number,Title: string}[],
  Data:{
    id: number;
    ClientName: string;
    Total: number;
    Rest: number;
}[]
}
const InvSell:React.FC<props> = (props) => {
    const [Filter, setFilter] =useState([true,false,false])
    const [ClickedSearch, setClickedSearch] = useState(false)
    const ClickSearchHandler=()=>{
      setClickedSearch(prev=>prev=!prev)
    }
    let arr=[...Filter] 
    const Clickhandler=(id:number)=>{
      arr=[false,false,false]
      arr[id]=true
      setFilter(arr);
      }
      let Img: StaticImageData
      const ImgHandler=()=>{
        switch (props.title) {
            case 'Customers':
             Img=customersA
                break;
            case 'Suppliers':
            Img=SupplierA
                break;
        }
     return Img
       }
       Img=ImgHandler()

       const [blogPosts, setBlogPosts] = useState([]);
       const [currentPage, setCurrentPage] = useState(1);
       const RowsPerPage = 5;
      
       const indexOfLastPost = currentPage * RowsPerPage;

       const LastPage= Math.ceil(props.Data.length/5)
       const [ArrayPage, setArrayPage] = useState([]);

       const DisplayPage=(id:number)=>{
        if(id>currentPage+1 || id<currentPage-2){
            return true
        }
        else return false
       }

       useEffect(() => {
        setBlogPosts(props.Data)
        for(let i=1;i<=LastPage;i++){
            ArrayPage.push(i)
         }
       }, [])
       const Array=ArrayPage.slice(0, LastPage); // this bcs there's a bug the page render twice which make the useeffect execute twice
       const indexOfFirstPost = indexOfLastPost - RowsPerPage;
       const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
       const HandelPagination=(id?:number,Dir?:string)=>{
        id!=0 && setCurrentPage(id) 
         if(Dir!=null){
        if(Dir=='+' && currentPage<LastPage) setCurrentPage(prev=>prev=prev+1)
        else if(Dir=='-' && currentPage!=1) setCurrentPage(prev=>prev=prev-1)
        }
       }

    return ( 
        <div  className=" bg-[#EFF2F6] w-full">
          <div  className='flex h-[50px] bg-white px-5 items-center ' >
      <div className={`flex gap-3 font-[700] text-[14px] py-3 items-center text-[#34393D]`}> 
       <Image alt="" src={Img} ></Image > {props.title}
      </div>
      </div> 
          <div className="grid  py-[30px] justify-center ">  
          <div className="flex justify-start gap-2 mt-5 " >
         
         {props.choices.map(Filterage=>{
            return <span key={Filterage.id} onClick={()=>{Clickhandler(Filterage.id)}} >
                   <FilterElmnt Filter={Filter[Filterage.id]} {...Filterage}></FilterElmnt>
            </span>
         })}
         </div>
          <div className="bg-white grid justify-center grid-rows-[90px,450px] py-3 pb-4 w-[874px] ">
           <div className="w-full h-[90px]  flex justify-between items-center " >
            <div  className="w-[130px] h-[40px] bg-[#3A78F1] rounded-[10px] cursor-pointer text-white text-[14px] flex justify-center 
            gap-2 font-bold items-center  " > 
            <Image src={Plus} alt=""></Image> Add {props.title}   </div>
            <div className='relative'  onBlur={()=>ClickSearchHandler()} onFocus={()=>ClickSearchHandler()}    >
              <input type="text" placeholder="Search" className="w-[300px] rounded-[10px] p-2 px-4 bg-[#FAFAFA] h-[36px] " />
              <Image src={CloseSearch} className={ ` ${!ClickedSearch &&  'hidden' } absolute top-[50%] translate-y-[-50%] right-[3%] `} alt=''  ></Image>
            </div>
           </div>
           <table className=" w-[650px] text-left ">
            <thead>
            <tr className="text-[#A0AEC0] ">
    <th>Id</th>
    <th>{props.title=='invoice' && 'Supplier Name' }     {props.title=='Sell' && 'Customer Name' }</th>
    <th>Total</th>
    <th>Rest</th>
    <th>state </th>
    <th></th>
    <th></th>
            </tr>
            </thead>
          
           <tbody>
            {currentPosts.map(Data=>{
             return <tr key={Data.id}  >
             <td> {Data.id} </td>
             <td> {Data.Name}</td>
            <td>{Data.Total}Dz</td>
            <td>{Data.Rest}Dz</td>
           <td>
            <span className={ `w-[64px] h-[27px] rounded-[5px] p-1 px-3 uppercase font-bold
                        ${Data.Rest==0 ? 'bg-[#FFE6EF] text-[#7F193B] ' : 'text-[#326E56] bg-[#ECF8F1] '} `} >
            {Data.Rest==0 && 'Paid' }   
             {Data.Rest>0 && 'UnPaid' }
            </span>
            </td>
           <td>
           <Image  src={Modifier} alt='' ></Image>
          </td>
           <td>
           <Image src={Delete} alt=''></Image>
           </td>
         </tr>
             })}
           </tbody>
          </table>
          <div className=" flex w-[650px] justify-items-center justify-between ">
            <Image src={LeftArrow} alt="" className='cursor-pointer' onClick={()=>HandelPagination(0,'-')} ></Image>
                {Array.map(Page=>{
                return <p key={Page} className={`cursor-pointer ${DisplayPage(Page) && 'hidden'} grid items-center justify-center rounded-[7px]
                    ${Page==currentPage && 'border-2 border-[#3A78F1] text-[#3A78F1] border-solid '} w-[30px] h-[30px]  `} 
                    onClick={()=>HandelPagination(Page)} > {Page} </p>
                 })}
            <Image src={RightArrow} className='cursor-pointer' alt="" onClick={()=>HandelPagination(0,'+')} ></Image>
            </div>
          </div>
          </div>
         
        </div>     
     );
}

export default InvSell;