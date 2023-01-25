import Image from 'next/image'
import {MdOutlineNotifications} from "react-icons/md";
const NavBar = () => {
    return (<div className="h-[72px] flex flex-end gap-3 w-full border-b-[#EBF1F7] border-b border-b-solid   ">
        <MdOutlineNotifications></MdOutlineNotifications>
        <Image  alt='' src='' className=' rounded-full w-[30px] h-[30] ' />
        Boss Allali 
        </div> );
}
 
export default NavBar;