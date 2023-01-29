import IndexTeplate from '../../Componants/IndexTemplate';

export default function Home() {
 const url=`http://localhost:3000/api/sale`
  
  return (
    <IndexTeplate  Filter={true}  url={url} Type='IS' title='Sale' ></IndexTeplate>
  )
}
