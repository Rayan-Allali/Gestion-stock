import IndexTeplate from '../../Componants/IndexTemplate'

export default function Home() {

  const url=`http://localhost:3000/api/invoice`

  return (
    <IndexTeplate  Filter={true} title='Invoice' url={url}  Type="IS" ></IndexTeplate>
  )
}
