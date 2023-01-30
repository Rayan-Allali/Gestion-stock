import IndexTeplate from "../../Componants/IndexTemplate";


export default function Home() {
    const url=`http://localhost:3000/api/bonCommande`
      return (
        <IndexTeplate  Filter={false} title='BonCommande' url={url}  Type="Bc" ></IndexTeplate>
      )
    }