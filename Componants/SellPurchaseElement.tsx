import Bag from '../public/Bag.svg'
import paidor from '../public//PaidOr.svg'
import unpaidor from '../public//UnpaidOr.svg'
import Coin from '../public/Coin.svg'
import Tag from '../public/Tag.svg'
import Revenu from '../public/Revenu.svg'
import Profit from '../public/Profit.svg'
import Image, { StaticImageData } from 'next/image'

interface props{ id:number,
  Type:number,
  Text:string,
  nbr:string
}
const SaleBuy:React.FC<props> = (props) => {
    let Img: StaticImageData
    const ImgSetter=()=>{
      switch (props.id) {
          case 0:
           Img= props.Type==0 ? Tag : Bag
              break;
          case 1:
            Img= props.Type==0 ? Revenu : paidor
              break; 
         case 2 : 
         Img=Coin
          break;  
        case 3:
            Img= props.Type==0 ? Profit : unpaidor
        break;
      }
   return Img
     }
     Img=ImgSetter()
    
  return ( 
        <div className="flex items-center gap-[10px] ">   
        <div  className={`rounded-[10px] w-[38px] h-[38px] text-2xl grid justify-center items-center ${props.id==0 && 'bg-[#E8E1FF]'}
        ${props.id==1 && 'bg-[#D8FFF5]'} ${props.id==2 && 'bg-[#FFFBD0]'} ${props.id==3 && 'bg-[#FFF3DF]'}  `} >
      
       <Image alt="" src={Img}></Image>
       
        </div>
        <div>
        <h1 className='text-[14px] leading-[17px] text-[#B5B4B2] font-[700]' > {props.Text} </h1>
         <p   className='text-[24px] leading-[27px] font-[700]'>{props.nbr}</p>
        </div>
      </div>

     );
}
 
export default SaleBuy;