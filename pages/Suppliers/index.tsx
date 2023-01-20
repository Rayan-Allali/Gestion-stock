
import SupCus from '../../Componants/Tables/SupCusTable'

export default function Home() {
  const Suppliers=[{ 
    id:1,
    Name:"Ryad",
    Credit:0,
    PhoneNumber: '0551055989',
    Points:1590
  },
  { 
    id:2,
    Name:"Rayan",
    Credit:50,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:3,
    Name:"Rayan",
    Credit:5,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:4,
    Name:"Mohamed",
    Credit:7,
    PhoneNumber: '0551055989',
    Points:11590
  },
  { 
    id:5,
    Name:"Rayan",
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:6,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:7,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:8,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:9,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:10,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:11,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:12,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { id:13,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:14,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:15,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:16,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:17,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:18,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:19,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:20,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:21,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:22,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:23,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:24,
    Name:"Rayan",
    Credit:77,
    PhoneNumber: '0551055989',
    Points:590
  },
  { 
    id:25,
    Name:'Rayan',
    Credit:0,
    PhoneNumber: '0551055989',
    Points:590
  }
  

]
 const Filtage=[{id:0,Title:'All Suppliers',Nbr:50},{id:1,Title:'Best Suppliers',Nbr:30}]
  return (
    <>
      <SupCus   Data={Suppliers} choices={Filtage} title="Supplier"  ></SupCus>
    </>
  )
}
