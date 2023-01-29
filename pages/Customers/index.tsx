

import IndexTeplate from '../../Componants/IndexTemplate';

export default function Home() {
const url=`http://localhost:3000/api/customer`

 return (
  <IndexTeplate  Filter={true} title='Customer' url={url}  Type="CS" ></IndexTeplate>
  )
}
