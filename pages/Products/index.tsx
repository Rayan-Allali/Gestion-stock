
import ProduitStock from '../../Componants/Tables/ProduitStock'

export default function Home() {
  const Products=[{ 
    Name:"Ryad",
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:2,
    Name:"Rayan",
    Quantite:50,
    Vendor: 'Ryad',
    Type:'Drink',
    UnitePrice:1500
  },
  { 
    id:3,
    Name:"Rayan",
    Quantite:5,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:4,
    Name:"Mohamed",
    Quantite:7,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:5,
    Name:"Rayan",
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:6,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:7,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:8,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:9,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:10,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:11,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:12,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { id:13,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:14,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:15,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:16,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:17,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:18,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:19,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:20,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:21,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:22,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:23,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:24,
    Name:"Rayan",
    Quantite:77,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  },
  { 
    id:25,
    Name:'Rayan',
    Quantite:0,
    Vendor: 'Ryad',
    Type:'Fruit',
    UnitePrice:1500
  }
  

]
  return (
    <>
      <ProduitStock   Data={Products}  title="Product"  ></ProduitStock>
    </>
  )
}
