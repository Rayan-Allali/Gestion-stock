import {useState} from 'react';
import Link from 'next/link'
import SideElements from './SideNavElements'


interface props{
  className: string;
  State:boolean[]
}

const SideNavbar:React.FC<props> = (props) => {
    const [SideNav, setSideNav] = useState(props.State)
    const Elements=[
      { id:0,
        Title:'Dashbord'} ,
      { id:1,
        Title:'Products'} ,
      { id:2,
      Title:'Customers'} ,
      { id:3,
      Title:'Suppliers'} ,
      { id:4,
      Title:'Sales'} ,
      { id:5,
      Title:'Stock'} ,
      { id:6,
      Title:'Invoices'} ,
      { id:7,
       Title:'History'},
       { id:8,
        Title:'PurchaseOrder'}
      ]
    // the SideNav variable  
    let arr=[...SideNav]
   const Clickhandler=(id: number)=>{
   arr=[false,false,false,false,false,false,false,false,false]
   arr[id]=true
   setSideNav(arr);
   }
    return ( 
        <div  className="bg-[#FFFFFF] h-[100vh] py-4 items-center text-[24px] flex flex-col border-r-[#EBF1F7] border-r 
        border-r-solid  gap-[33px] w-[230px] fixed font-[700] " >
        <h1 className="text-[#27427B] border-b-[#EBF1F7] w-full text-center pb-5 border-b border-b-solid ">GSTOCK</h1>
        {/* {props.Title} */}
        <div  className="flex flex-col  items-start text-[15px] w-full gap-[5px] " >
          {Elements.map(Element=>{
            return <Link key={Element.id}
             href={`/${Element.Title=="Dashbord" ? "" : Element.Title }`}  
             onClick={()=>{Clickhandler(Element.id)}} > 
            <SideElements Title={Element.Title}  Clicked={SideNav[Element.id]}></SideElements>
            </Link>
          })}
        </div>
     </div>
     );
}
 
export default SideNavbar;