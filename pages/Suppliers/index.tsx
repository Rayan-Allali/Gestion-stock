import IndexTeplate from '../../Componants/IndexTemplate'

export default function Home() {
const url=`http://localhost:3000/api/supplier`

 return (
  <IndexTeplate  Filter={false} title='Supplier' url={url}  Type="CS" ></IndexTeplate>
  )
}
