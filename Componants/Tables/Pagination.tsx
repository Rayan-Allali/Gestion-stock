import LeftArrow from '../../public/LeftArrow.svg'
import RightArrow from '../../public/RightArrow.svg'
import Image from 'next/image'
import { Dispatch, useEffect, useState } from 'react';
interface props{
    Array: any[];
    Data?:any;
    setData: Dispatch<any>;
    HandelPagination: (id?: number, Dir?: string) => void;
    currentPage: number;
    DisplayPage: (id: number) => boolean;
}
const Pagination:React.FC<props> = (props) => {

          const [blogPosts, setBlogPosts] = useState([]);
       const [currentPage, setCurrentPage] = useState(1);
       const RowsPerPage = 4;
       const indexOfLastPost = currentPage * RowsPerPage;
       const LastPage = Math.ceil(props.Data.length / 4);
       const [ArrayPage, setArrayPage] = useState([]);
     
       const DisplayPage = (id: number) => {
         if (LastPage > 3) {
           if (currentPage == 1) {
             if (
               id != currentPage + 1 &&
               id != currentPage + 2 &&
               id != currentPage
             ) {
               return true;
             } else return false;
           } else if (currentPage == LastPage) {
             if (
               id != currentPage - 1 &&
               id != currentPage - 2 &&
               id != currentPage
             ) {
               return true;
             } else return false;
           } else {
             if (
               id != currentPage + 1 &&
               id != currentPage - 1 &&
               id != currentPage
             ) {
               return true;
             } else return false;
           }
         }
       };
     
       useEffect(() => {
         // page data
         setBlogPosts(props.Data);
         for (let i = 1; i <= LastPage; i++) {
           ArrayPage.push(i);
         }
         // selecteddata
         // setselectData([{ selected: false, id: "0" }]);
         // for (let i of props.Data) {
         //   setselectData((current) => [
         //     ...current,
         //     { selected: false, id: i.codeP },
         //   ]);
         // }
         // console.log(selectData);
       }, []);
       const Array = ArrayPage.slice(0, LastPage); // this bcs there's a bug the page render twice which make the useeffect execute twice
       const indexOfFirstPost = indexOfLastPost - RowsPerPage;
       const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
     
      props.setData(currentPosts)
       const HandelPagination = (id?: number, Dir?: string) => {
         id != 0 && setCurrentPage(id);
         if (Dir != null) {
           if (Dir == "+" && currentPage < LastPage)
             setCurrentPage((prev) => (prev = prev + 1));
           else if (Dir == "-" && currentPage != 1)
             setCurrentPage((prev) => (prev = prev - 1));
         }
       };



    return ( <div className="flex w-[650px] mt-10 justify-items-center justify-between ">
    <Image src={LeftArrow} alt="" className='cursor-pointer' onClick={()=>props.HandelPagination(0,'-')} ></Image>
        {props.Array.map(Page=>{
        return <p key={Page} className={`cursor-pointer ${props.DisplayPage(Page) && 'hidden'} grid items-center justify-center rounded-[7px]
            ${Page==props.currentPage && 'border-2 border-[#3A78F1] text-[#3A78F1] border-solid '} w-[30px] h-[30px]  `} 
            onClick={()=>props.HandelPagination(Page)} > {Page} </p>
         })}
    <Image src={RightArrow} className='cursor-pointer' alt="" onClick={()=>props.HandelPagination(0,'+')} ></Image>
  </div> );
}
 
export default Pagination ;