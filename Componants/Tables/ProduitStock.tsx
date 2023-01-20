import {useEffect, useState} from 'react';
import StockA from '../../public/Stock+.png'
import Modifier from '../../public/Modifier.svg'
import Delete from '../../public/Delete.svg'
import Plus from '../../public/Plus.svg'
import ProduitA from '../../public/product+.png'
import LeftArrow from '../../public/LeftArrow.svg'
import RightArrow from '../../public/RightArrow.svg'
import CloseSearch from '../../public/CloseSearch.svg'
import Image, { StaticImageData } from 'next/image'
import FilterElmnt from '../Filter';
interface props{
  title:string,
  choices?: { id:number, Nbr: number,Title: string}[],
  Data:{
    Name: String;
    Quantite: number;
    Vendor: string;
    Type: string;
    UnitePrice: number;
}[]
}
const ProduitStock:React.FC<props> = (props) => {
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
      const ImgSetter=()=>{
        switch (props.title) {
            case 'Stock':
             Img=StockA
                break;
            case 'Product':
            Img=ProduitA
                break;  
        }
     return Img
       }
       Img=ImgSetter()

       const [blogPosts, setBlogPosts] = useState([]);
       const [currentPage, setCurrentPage] = useState(1);
       const RowsPerPage = 5;
       const indexOfLastPost = currentPage * RowsPerPage;
       const LastPage= Math.ceil(props.Data.length/5)
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
       <Image alt="" src={Img} ></Image > {props.title}s
      </div>
      </div> 
          <div className="grid  py-[30px] justify-center ">  
          {props.choices && <div className="flex justify-start gap-2 mt-5 " >
         {props.choices.map(Filterage=>{
            return <span key={Filterage.id} onClick={()=>{Clickhandler(Filterage.id)}} >
                   <FilterElmnt Filter={Filter[Filterage.id]} {...Filterage}></FilterElmnt>
            </span>
         })}
         </div>}
          
          <div className="bg-white grid justify-center grid-rows-[90px,250px] py-2 pb-4 w-[874px] ">
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
    <th className='w-[15%] ' >Name</th>
    <th  className='w-[15%] ' >Quantite</th>
    <th className='w-[15%] ' > Vendor </th>
    <th className='w-[15%] ' >Type</th>
    <th  className='w-[24%] ' >Unite Price </th>
    <th className='w-[8%] '></th>
    <th className='w-[8%] '></th>
            </tr>
            </thead>
          
           <tbody>
            {currentPosts.map(Data=>{
             return <tr key={Data.id}  >
             <td> {Data.Name} </td>
             <td> {Data.Quantite}</td>
            <td>{Data.Vendor}</td>
            <td>{Data.Type}</td>
           <td>{Data.UnitePrice }Dz</td>
           <td className='cursor-pointer' >
           <Image src={Modifier} alt='' ></Image>
          </td>
           <td className='cursor-pointer' >
           <Image src={Delete} alt=''></Image>
           </td>
         </tr>
             })}
           </tbody>
          </table>
          <div className=" flex w-[650px] mt-10 justify-items-center justify-between ">
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

export default ProduitStock;