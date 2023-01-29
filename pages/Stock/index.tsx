import IndexTeplate from '../../Componants/IndexTemplate'

export default function Home() {
const url=`http://localhost:3000/api/productStock`
  return (
    <IndexTeplate  Filter={false} title='Stock' url={url}  Type="PS" ></IndexTeplate>
  )
}
