import '../styles/globals.css'
import SideNavbar from '../Componants/SideNvar/SideNav'
import Navbar from '../Componants/Navbar'
import { Lato } from '@next/font/google'

const lato = Lato({
  weight: ['400','700'],
  subsets: ['latin'],
})
export default function App({ Component, pageProps }) {

  return  <main className={`  ${lato.className } font-semibold grid grid-cols-[230px,1fr] w-full` } >
   <SideNavbar  className={` col-span-1 ` }   />
  <div   className=" col-start-[2] col-end-[3] ">
  <Navbar/>
  <Component className="grid justify-end" {...pageProps} /> 
  </div>
 
  </main>
}
