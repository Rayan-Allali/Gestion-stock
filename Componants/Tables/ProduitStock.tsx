import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Typearrow from '../../public/TypeArrow.png'
import Image, { StaticImageData } from "next/image";
import {
  MdDelete,
  MdModeEdit,
} from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from "axios";
import SectionTitle from "../SectionTitle";
import Link from "next/link";
import Upper from "./UpperTable";
import Pagination from "./Pagination";

interface props {
  title: string;
  setAddClick: Dispatch<SetStateAction<boolean>>,
  choices?: { id: number; Nbr: number; Title: string }[];
  Data: {
    codeP?: number; idStock?: number;
    nomP?: string; qte?: number;
    designation?: string; prixV?: number;
    type?: string; prixHt?:number;
    qteAchat?: number; produit?:number;
    qteVendu?: number;   
  
  }[];
}
const ProduitStock: React.FC<props> = (props) => {
  const [EditClick, setEditClick] = useState(false)
  
  const [select, setselect] = useState(false);
  const [selectData, setselectData] = useState<number[]>([]);
  const handleSelect = () => {
    if(select==true){
   for(let i=0;i<=selectData.length;i++) DeleteElement(selectData[i]);
    }
    setselect((prev) => (prev = !prev));
  };
 const AddSelected=(id:number)=>{
  if(selectData.includes(id)){
    const index = selectData.indexOf(id);
    selectData.splice(index, 1);
  }
 else selectData.push(id);
  console.log(selectData)
 }
  const DeleteElement = (ID: number) => {
    axios
      .delete(`http://localhost:3000/api/product/${ID}`)
      .then(() => {
        console.log("No probleme");
        location.reload();
      })
      .catch((err) => console.log(err));
  };

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

  const HandelPagination = (id?: number, Dir?: string) => {
    id != 0 && setCurrentPage(id);
    if (Dir != null) {
      if (Dir == "+" && currentPage < LastPage)
        setCurrentPage((prev) => (prev = prev + 1));
      else if (Dir == "-" && currentPage != 1)
        setCurrentPage((prev) => (prev = prev - 1));
    }
  };

  return (
    <div className=" bg-[#EFF2F6] h-[calc(100vh-75px)] w-full">
      <SectionTitle type={props.title}  title={props.title}  ></SectionTitle>
      <div className="grid  py-[30px] justify-center ">
        <div className=" bg-white grid justify-center justify-items-center grid-rows-[90px,200px] py-2 pb-4 w-[900px] ">
        <Upper  handleSelect={handleSelect} setAddClick={props.setAddClick} title={props.title} ></Upper>
          <table className=" w-[750px] text-left ">
            <thead>
              <tr className="text-[#A0AEC0] ">
                <th className="w-[3%] "></th>
                <th className="w-[20%] ">  {props.title=="Product" ? "Name" : "Product Id" } </th>
                <th className="w-[15%] ">  {props.title=="Product" ? "Type" : "Qte in Stock" } </th>
                <th className="w-[15%] "> {props.title=="Product" ? "Qte vendu" : "Wind price" } </th>
                <th className="w-[18%] "> {props.title=="Product" ? "Qte Achet" : "Purchase price" } </th>
                <th className="w-[4%] "></th>
                <th className="w-[4%] "></th>
              </tr>
            </thead>

            <tbody>
              {currentPosts.map((Data) => {
                return (
                  <tr key={Math.random()}>
                    <td className={` ${!select && "invisible"} `}>
                      <input type="checkbox" name="" onClick={()=>{ AddSelected(Data.codeP  || Data.idStock );}} />
                    </td>
                    <td> {Data.nomP} {Data.produit} </td>
                    <td>{Data.type} {Data.qte} </td>
                    <td> {Data.qteVendu}   {Data.prixV} {props.title=="Stock" && "DZ" }  </td>
                    <td>{Data.qteAchat}  {Data.prixHt} {props.title=="Stock" && "DZ" } </td>
                    <td className="">
                      <MdModeEdit className="cursor-pointer  text-2xl"></MdModeEdit>
                    </td>
                    <td>
                      <MdDelete
                        onClick={() => {DeleteElement(Data.codeP)}}
                        className="cursor-pointer  text-2xl"
                      ></MdDelete>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination Array={Array}  DisplayPage={DisplayPage} HandelPagination={HandelPagination} currentPage={currentPage}  ></Pagination>
        </div>
      </div>
    
      <Link className="bg-[#D8E3FA] cursor-pointer relative left-[80%] items-center justify-center h-[40px] w-[110px] hover:bg-[#c6d1eb]
       text-[#576AC5] border-[#576AC5] border border-solid rounded-[10px] flex gap-2 hover:text-[#4f5fb3] hover:border-[#4f5fb3] 
       duration-500 " href={ props.title=='Product' ? "/Products/Type" : "/Stock/History" } >
      {props.title=='Product' ?  'Types' :  "History" }    <Image alt="" src={Typearrow} ></Image>
      </Link>
    </div>
  );
};

export default ProduitStock;
