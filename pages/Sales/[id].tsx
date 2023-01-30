import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ProduitStock from '../../Componants/Tables/ProduitStock'
import SectionTitle from '../../Componants/SectionTitle';
import Upper from '../../Componants/Tables/UpperTable';
import Pagination from '../../Componants/Tables/Pagination';

const Id = () => {
    const router = useRouter()
    const pid = router.query.id
    const [Data, setData] = useState<any>()
    const [AddClick, setAddClick] = useState(false)
 

//  to delete one element 
 const DeleteElement = (ID: number) => {
   axios.delete(`http://localhost:3000/api/supplier/${pid}`)
   .then(() => {
     console.log("No probleme");
     location.reload();
   })
   .catch((err) => console.log(err));
   };

//  to delete one element  selecteddata = element li we did ckecked select mean we clicked 3la supprimer
 const [select, setselect] = useState(false)
 const [selectData, setselectData] = useState<number[]>([]);
 const handleSelect = () => {
   if(select==true){
  for(let i=0;i<=selectData.length;i++) DeleteElement(selectData[i]);
   }
   setselect((prev) => (prev = !prev));
 };



 const [blogPosts, setBlogPosts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const RowsPerPage = 5;

 const indexOfLastPost = currentPage * RowsPerPage;

 const LastPage= Math.ceil(Data?.length/5)
 const [ArrayPage, setArrayPage] = useState([]);

 const DisplayPage=(id:number)=>{
  if(LastPage>3){
    if(currentPage==1){
    if(id!=currentPage+1 && id!=currentPage+2 && id!=currentPage ){
        return true
    }
    else return false  
    }else if(currentPage==LastPage){
      if(id!=currentPage-1 && id!=currentPage-2 && id!=currentPage ){
        return true
    }
    else return false  
    }
   else{
    if(id!=currentPage+1 && id!=currentPage-1 && id!=currentPage ){
      return true
       }
     else return false    
   }
  }
 }


 useEffect(() => { 
  axios.get(`http://localhost:3000/api/sale/2`)
  .then(res => {
   setData(res.data.data)
   console.log(res.data.data);
   setBlogPosts(Data)
   for(let i=1;i<=LastPage;i++){
       ArrayPage.push(i)
    }
  })
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
    <div  className=" bg-[#EFF2F6] text-sm w-full">
    <SectionTitle title={'#1 rayan Allali'} type={'Sale'}></SectionTitle>
    {Data &&   <div className="grid py-[30px] justify-center ">  
        <div className="flex justify-start gap-2 mt-5 " >
       
       {/* {props.choices.map(Filterage=>{
          return <span key={Filterage.id} onClick={()=>{Clickhandler(Filterage.id)}} >
                 <FilterElmnt Filter={Filter[Filterage.id]} {...Filterage}></FilterElmnt>
          </span>
       })} */}
       </div>

        <div className="bg-white grid justify-center grid-rows-[90px,200px] py-1 pb-4 w-[874px] ">
          <Upper  handleSelect={handleSelect} setAddClick={setAddClick} title="product" ></Upper>
        
         <table className=" w-[750px] text-left border-spacing-x-1 ">
          <thead>
          <tr className="text-[#A0AEC0] ">
  <th  className='w-[5%] ' >FId</th>
  <th  className='w-[24%] ' >Date</th>
  <th  className='w-[12%] '>Total</th>
  <th   className='w-[12%] ' >Rest</th>
  <th  className='w-[18%] ' >state </th>
  <th  className='w-[14%] ' ></th>
  <th  className='w-[14%] ' ></th>
          </tr>
          </thead>
        
         <tbody>
          {Data.map(Data=>{ 
           return <tr key={Math.random()}  > 
           <td> {Data.idAchat} {Data.fournisseur} </td>
           <td> {Data.dateF} </td>
          <td>{Data.montantTotal} {Data.TotalTtc} Dz</td>
          <td>{Data.montantRestant}  {Data.TotalRest} Dz</td>
         <td>
          <span className={ `w-[64px] h-[27px] rounded-[5px] p-1 px-3 uppercase font-bold
                      ${Data.montantRestant==0 ? ' text-[#326E56] bg-[#ECF8F1]  ' : 'bg-[#FFE6EF] text-[#7F193B]'} `} >
          {Data.montantRestant==0 && 'Paid' }  {Data.TotalRest==0 && 'Paid' }   
           {Data.montantRestant>0 && 'UnPaid' }  {Data.TotalRest>0 && 'UnPaid' }
          </span>
          </td>
         <td className='cursor-pointer font-bold' >
         
          {/* <Link href={`http://localhost:3000/${props.title}s/${Data.idAchat}`}
          className='w-[99px] flex justify-center items-center gap-2 border border-[#E2E8F0] border-solid h-[38px] rounded-[10px] '>
          <Image  src={open} alt='' ></Image> Open
          </Link> */}
       
    </td>
         <td className='cursor-pointer font-bold' >
          {/* <span className='w-[99px] flex justify-center items-center gap-2 border bg-[#3A78F1] border-[#E2E8F0] border-solid 
          h-[38px] rounded-[10px]  text-white'>
          <Image  src={dollar} alt=''></Image> Pay
          </span> */}
         
         </td>
       </tr>
           })}
         </tbody>
        </table>
        <Pagination Array={Array}  DisplayPage={DisplayPage} HandelPagination={HandelPagination} currentPage={currentPage}  ></Pagination>
        </div>
        </div> }
        
       
      </div>
   
   );
}
 
export default Id;