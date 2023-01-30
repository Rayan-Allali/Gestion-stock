import { AnimatePresence, motion } from "framer";
import { useEffect, useState } from "react";
import Edit from "../../Componants/Edit/EditCS";
import Navbar from "../../Componants/Navbar";
import Men from '../../public/Men.png'
import SideNavbar from "../../Componants/SideNvar/SideNav";
import { useRouter } from 'next/router'
import { MdDelete,MdModeEdit } from "react-icons/md";
import Image from 'next/image'
import Upper from "../../Componants/Tables/UpperTable";
import axios from "axios";
import Pagination from "../../Componants/Tables/Pagination";


const id = () => {
    const router = useRouter()
    const pid = router.query.id as string

    let State=[false,true,false,false,false,false,false,false]
     const [EditClick, setEditClick] = useState(false)
     const [Filter, setFilter] =useState([true,false,false])
     const [FilterData, setFilterData] =useState([{id:0,Name:'Reglement',nbr:10},{id:1,Name:'Sales',nbr:10},{id:2,Name:'Products',nbr:10}])
     let arr=[...Filter] 
     const Clickhandler=(id:number)=>{
       arr=[false,false]
       arr[id]=true
       setFilter(arr);
       }

       const [select, setselect] = useState(false);
       const [selectData, setselectData] = useState<number[]>([]);
       const [Data, setData] = useState<any>()
       const [AddClick, setAddClick] = useState<any>([]);
       
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
     
    //    const [blogPosts, setBlogPosts] = useState([]);
    //    const [currentPage, setCurrentPage] = useState(1);
    //    const RowsPerPage = 4;
    //    const indexOfLastPost = currentPage * RowsPerPage;
    //    const LastPage = Math.ceil(Data.length / 4);
    //    const [ArrayPage, setArrayPage] = useState([]);
     
    //    const DisplayPage = (id: number) => {
    //      if (LastPage > 3) {
    //        if (currentPage == 1) {
    //          if (
    //            id != currentPage + 1 &&
    //            id != currentPage + 2 &&
    //            id != currentPage
    //          ) {
    //            return true;
    //          } else return false;
    //        } else if (currentPage == LastPage) {
    //          if (
    //            id != currentPage - 1 &&
    //            id != currentPage - 2 &&
    //            id != currentPage
    //          ) {
    //            return true;
    //          } else return false;
    //        } else {
    //          if (
    //            id != currentPage + 1 &&
    //            id != currentPage - 1 &&
    //            id != currentPage
    //          ) {
    //            return true;
    //          } else return false;
    //        }
    //      }
    //    };
     
    //    useEffect(() => {
    //      // page data
    //      setBlogPosts(Data);
    //      for (let i = 1; i <= LastPage; i++) {
    //        ArrayPage.push(i);
    //      }
    //      // selecteddata
    //      // setselectData([{ selected: false, id: "0" }]);
    //      // for (let i of props.Data) {
    //      //   setselectData((current) => [
    //      //     ...current,
    //      //     { selected: false, id: i.codeP },
    //      //   ]);
    //      // }
    //      // console.log(selectData);
    //    }, []);
    //    const Array = ArrayPage.slice(0, LastPage); // this bcs there's a bug the page render twice which make the useeffect execute twice
    //    const indexOfFirstPost = indexOfLastPost - RowsPerPage;
    //    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
     
    //    const HandelPagination = (id?: number, Dir?: string) => {
    //      id != 0 && setCurrentPage(id);
    //      if (Dir != null) {
    //        if (Dir == "+" && currentPage < LastPage)
    //          setCurrentPage((prev) => (prev = prev + 1));
    //        else if (Dir == "-" && currentPage != 1)
    //          setCurrentPage((prev) => (prev = prev - 1));
    //      }
    //    };


  const [Added,setAdded]=useState(false);
   let Type
   let url=''
      Type={
         codeF:0,
      nomF: "",   
      prenomF:"",
      adressF: "",
      teleF:"",
      img:"tst",
      email:"" }
      let id=parseInt(pid)
       
      console.log(parseInt(pid));
      setTimeout(() => {
        url=`http://localhost:3000/api/supplier/1`     
      }, 500);
   
 
   useEffect(() => { 
      // setdata(Type)
      setTimeout(() => {
        url!='' &&   axios.get(url)
        .then(res => {
           console.log("res : ",res.data.data)
           let x=res.data.data
           console.log(x)
           setData(res.data.data)
           console.log('data',Data)})
      }, 1000);
 
      //  console.log(Data);
    }, [])



const [data, setdata] = useState()
    console.log('Data:',Data)
    return ( 
      Data &&
        <div className='grid grid-cols-[230px,1fr] relative w-full'>
        <SideNavbar State={State} className={` col-span-1 ` }  />
        <div   className=" col-start-[2] col-end-[3] ">
   <Navbar/>
   
  <div  className="w-full h-[100vh] max-h-[calc(100vh-72px)] overflow-y-scroll bg-[#E8ECF5] grid py-6 gap-5  justify-center " >
    <div   className="bg-white flex h-[310px] w-[1060px]  " >
        
    <div  className="w-[205px] h-full flex flex-col gap-1 justify-center items-center relative  " >
    <MdModeEdit  className="absolute top-[5%] left-[5%] text-2xl " ></MdModeEdit>
        <Image  alt=""  src={Men} ></Image>
    <p>AllAli Ryad</p>
    <div className="flex gap-1 items-center text-xs " > 
    <div className="w-[90px] h-[3px] rounded-full bg-black  " ></div>
    50% paid
    </div>
    </div>
  {Data &&  <div className="flex flex-col gap-1 bg-[#E8ECF5] w-[calc(1060px-205px)] h-full items-start " >
        <div   className="w-full h-[116px] bg-white px-[15px] py-[15px] text-[#E8ECF5] font-semibold  " >
           <h1>  Supplier Profil </h1>
           <div  className="flex justify-items-center justify-between mt-4 " >
           <p>  Address : <span  className="text-black" > {Data.codeF} </span> </p>
           <p>   Email : <span className="text-black" > ryadAllali0@gmail.com </span> </p>
           <p>   Phone Number : <span className="text-black" > 1000 </span> </p>
           </div>
         
        </div>
        <div   className="w-full h-[90px] bg-white px-[10px] py-[15px] text-[#E8ECF5] font-semibold  " >
           <h1>  Supplier Status </h1>
           <div  className="flex justify-items-center justify-between mt-4 " >
           <p>   Points : <span className="text-[#03FF4A]" > 200 </span> </p>
           <p>   Sold : <span className="text-black" > 1000 </span> </p>
           </div>
         
        </div>

        <div   className="w-full h-[95px] bg-white px-[10px] py-[15px] text-[#E8ECF5] font-semibold  " >
           <h1> Numbers </h1>
           <div  className="flex justify-items-center justify-between mt-2 " >
           <p>  Products : <span className="text-black" > 1000 </span> </p>
           <p>   Invioces : <span className="text-black" > 1000 </span> </p>
           <p>   Reglement : <span className="text-black" > 200 </span> </p>
           </div>
         
        </div>
    </div>}
    </div>

    <div>
        <div  className="flex " >
            {FilterData.map(FLT=>{
                return   <div onClick={()=>{Clickhandler(FLT.id)}}
                 className= {`flex items-center gap-2 cursor-pointer p-2 px-3 rounded-t-lg rounded-tr-lg text-[15px]
                ${Filter[FLT.id] && "bg-white text-black"} ${!Filter[FLT.id] && "text-[#959B9F]  bg-[#ECF2FE] "}`}  >{FLT.Name}
                <div  className={`rounded-full grid justify-center items-center ${!Filter[FLT.id] && "bg-[#9EC2F6]"}
                 ${Filter[FLT.id] && "bg-[rgba(58,120,241,1)] text-white"} h-[24px] w-[34px] text-[12px]`} >{FLT.nbr}</div> 
                </div>
            })}
        </div>
  
    <div className=" bg-white grid justify-center justify-items-center grid-rows-[90px,200px] py-2 pb-4 w-[1060px] ">
        <Upper  handleSelect={handleSelect} setAddClick={setAddClick} title='Reglement' ></Upper>
          <table className=" w-[750px] text-left ">
            <thead>
              <tr className="text-[#A0AEC0] ">
                <th className="w-[3%] "></th>
                <th className="w-[20%] ">  {Filter[0] ? "N° Reglemnet" : "N° Sales" } </th>
                <th className="w-[15%] ">  montant</th>
                <th className="w-[15%] "> Rest</th>
                <th className="w-[4%] "></th>
                <th className="w-[4%] "></th>
              </tr>
            </thead>

            <tbody>
              {/* {Data.map((Data) => {
                return (
                  <tr key={Math.random()}>
                    <td className={` ${!select && "invisible"} `}>
                      <input type="checkbox" name="" onClick={()=>{ AddSelected(Data.codeP  || Data.idStock );}} />
                    </td>
                    <td> {Data.nomP} {Data.produit} </td>
                    <td>{Data.type} {Data.qte} </td>
                    <td> {Data.qteVendu}   {Data.prixV}   </td>
                    <td>{Data.qteAchat}  {Data.prixHt} </td>
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
              })} */}
            </tbody>
          </table>
          {/* <Pagination setData={setData} Array={Array}  DisplayPage={DisplayPage} HandelPagination={HandelPagination} currentPage={currentPage}  ></Pagination> */}
    </div> 
    </div>
   


  </div>
      </div>
     <AnimatePresence>
         {EditClick &&  <motion.div className='w-[calc(100vw-230px)] z-10 h-[calc(100vh-122px)] fixed bg-[#3b373713] left-[230px]  top-[122px] '   
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0, }} 
         transition={{duration:.5, }}>
         <Edit Title='' ID={parseInt(pid)} setClicked={setEditClick} ></Edit>
          </motion.div> }
     </AnimatePresence>
     </div>
      
  
    );
}
 
export default id;