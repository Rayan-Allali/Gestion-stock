import IndexTeplate from "../../Componants/IndexTemplate";


export default function Home() {
    const url=`http://localhost:3000/api/bl`
      return (
        <IndexTeplate  Filter={false} title='Product' url={url}  Type="BL" ></IndexTeplate>
      )
    }