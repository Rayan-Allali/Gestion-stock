import '../styles/globals.css'
import SideNavbar from '../Componants/SideNvar/SideNav'
import Navbar from '../Componants/Navbar'
import { Lato } from '@next/font/google'

const lato = Lato({
  weight: ['400','700'],
  subsets: ['latin'],
})
export default function App({ Component, pageProps }) {

  return  <main className={`  ${lato.className } font-semibold  w-full` } >
  
  <Component {...pageProps} /> 
 
  </main>
}
