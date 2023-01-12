import '../styles/globals.css'
import SideNavbar from "../Components/SideNavbar"
import Navbar from "../Components/Navbar"
export default function App({ Component, pageProps }) {
  return <>
  <Navbar/>
    <Component {...pageProps} /> 
    
    <SideNavbar/>
  </>
}
