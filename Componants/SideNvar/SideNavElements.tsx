import Sales from '../../public/Sales.svg'
import SalesA from '../../public/Sales+.png'
import customers from '../../public/customers.svg'
import customersA from '../../public/customers+.svg'
import DashbordA from '../../public/Dashbord+.png'
import Dashbord from '../../public/Dashbord.png'
import History from '../../public/History.svg'
import HistoryA from '../../public/History+.svg'
import invoice from '../../public/invoice.svg'
import invoiceA from '../../public/invoice+.svg'
import product from '../../public/product.png'
import productA from '../../public/product+.png'
import Stock from '../../public/Stock.png'
import StockA from '../../public/Stock+.png'
import Supplier from '../../public/Supplier.svg'
import SupplierA from '../../public/Suppliers+.svg'
import Image, { StaticImageData } from "next/image";
interface props{
    Clicked:boolean,
    Title:string,
}
const SideElements:React.FC<props> = (props) => {
    let Img: StaticImageData
   const ImgSetter=()=>{
    switch (props.Title) {
        case 'Dashbord':
         Img=props.Clicked ? DashbordA : Dashbord 
            break;
        case 'Products':
        Img=props.Clicked ? productA : product 
            break;
        case 'Customers':
        Img=props.Clicked ? customersA : customers 
            break;
        case 'Suppliers':
        Img=props.Clicked ? SupplierA : Supplier
            break;
        case 'Sales':
        Img=props.Clicked ? SalesA : Sales 
            break;
        case 'Stock':
        Img=props.Clicked ? StockA : Stock 
            break;
        case 'Invoices':
        Img=props.Clicked ? invoiceA : invoice 
            break;
        case 'History':
        Img=props.Clicked ? HistoryA : History 
            break;    
    }
 return Img
   }
   Img=ImgSetter();
    return ( 
       
        <div className={`flex gap-3 cursor-pointer py-1 items-center ${props.Clicked && "text-[#3a78f1]"}  ${!props.Clicked && "text-[#9ca1a5] "} pl-10 w-full`}  > 
        <div  className={`  ${props.Clicked && "bg-[#ECF2FE] rounded-full"}   w-[44px] h-[44px] grid justify-center items-center p-2 text-2xl `}>
        <Image alt='' src={Img} ></Image>
        </div>
        {props.Title}</div>
        );
}
 
export default SideElements;