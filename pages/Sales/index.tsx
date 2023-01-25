
import InvSale from '../../Componants/Tables/InvSale'

export default function Home() {
 let unpaid=0;
  const Sales=[{ 
    id:1,
    ClientName:"Rayan",
    Total: 15000,
    Rest:0
  },
  { 
    id:2,
    ClientName:"Rayan",
    Quantite:50,
    Total: 15000,
    Rest:15
  },
  { 
    id:3,
    ClientName:"Rayan",
    Quantite:5,
    Total: 15000,
    Rest:15
  },
  { 
    id:4,
    ClientName:"Mohamed",
    Quantite:7,
    Total: 15000,
    Rest:15
  },
  { 
    id:5,
    ClientName:"Rayan",
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:6,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:7,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:8,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:9,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:10,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:11,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:12,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { id:13,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:14,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:15,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:16,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:17,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:18,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:19,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:20,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:21,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:22,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:23,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  },
  { 
    id:24,
    ClientName:"Rayan",
    Quantite:77,
    Total: 15000,
    Rest:15
  },
  { 
    id:25,
    ClientName:'Rayan',
    Quantite:0,
    Total: 15000,
    Rest:15
  }
]

const countpaid=()=>{
  for(let sale of Sales){
    if(sale.Rest>0) unpaid++
  }
  return unpaid
}
unpaid=countpaid();
const Filtage=[{id:0,Title:'All Invoices',Nbr:Sales.length},{id:1,Title:'Paid Invoice',Nbr:Sales.length-unpaid},
{id:2,Title:'Unpaid Invoice',Nbr:unpaid}]

  return (
    <>
      <InvSale   Data={Sales} choices={Filtage}  title="Sale"  ></InvSale>
    </>
  )
}
