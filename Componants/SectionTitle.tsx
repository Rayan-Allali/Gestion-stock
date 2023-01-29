import Image, { StaticImageData } from 'next/image'
import History from '../public/History.png'
import InvoiceA from '../public/invoice+.svg'
import SaleA from '../public/Sales+.png'
import StockA from '../public/Stock+.png'
import ProduitA from '../public/product+.png'
import customersA from '../public/customers+.svg'
import SupplierA from '../public/Suppliers+.svg'

// type Type= 'Invoice' | 'Customer' | 'Product' | 'Stock' | 'Sale' | 'Supplier' | 'History'
interface props{
    title:string,
    type:string
  }

const SectionTitle :React.FC<props>= (props) => {
    let Img: StaticImageData
      const ImgSetter=()=>{
        switch (props.type) {
            case 'Invoice':
             Img=InvoiceA
                break;
            case 'Sale' :
            Img=SaleA
            case 'Customer':
            Img=customersA
                break;
            case 'Supplier':
            Img=SupplierA
                break;
            case 'Customer':
            Img=customersA
                break;
            case 'Stock':
            Img=StockA
                break;
            case 'Product':
            Img=ProduitA
                break;
            case 'History' : 
            Img=History
            break;
        }
     return Img
       }
       Img=ImgSetter()
    return ( 
        <div  className='flex h-[50px] bg-white px-5 items-center ' >
                    <div className={`flex gap-3 font-[700] text-[14px] py-3 items-center text-[#34393D]`}> 
                    <Image alt="" src={Img} ></Image > {props.title}
                    </div>
        </div> 
     );
}
 
export default SectionTitle;