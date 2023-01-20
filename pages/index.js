import Head from 'next/head'
import SaleBuy from '../Componants/SellPurchaseElement';
import DashbordA from '../public/Dashbord+.png'
import {FaUsers} from "react-icons/fa";
import unpaidinv from '../public/unpaidinv.svg'
import paidinv from '../public/paidinv.svg'
import Image from 'next/image'
export default function Home() {
  const Sales=[
    { id:0,
      Type:0,
      Text:'Total Sales',
      nbr:'650'
    },
    { id:1,
      Type:0,
      Text:'Revenu',
      nbr:'18K'
    },
    { id:2,
      Type:0,
      Text:'Cost',
      nbr:'18K'
    },
    { id:3,
      Type:0,
      Text:'profit',
      nbr:'8K'
    },
  ];
  const Purchases=[
    { id:0,
      Type:1,
      Text:'Total Sales',
      nbr:'650'
    },
    { id:1,
      Type:1,
      Text:'Paid Order',
      nbr:'10K'
    },
    { id:2,
      Type:1,
      Text:'Cost',
      nbr:'18K'
    },
    { id:3,
      Type:1,
      Text:'Inpaid Order',
      nbr:'8K'
    },
  ];

 return (
    <>
      <Head children={''}>
        <>
        <title>GSTOCK</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        </>
         </Head>
      <main className={`w-full bg-[#F8F8F8] pb-[20px] `} >

      <div  className='flex h-[50px] bg-white justify-between justify-items-center px-5 items-center ' >
      <div className={`flex gap-3 font-[700] text-[14px] py-3 items-center text-[#34393D]`}> 
      <Image alt='' src={DashbordA} ></Image>  Dashborad
      </div>
      <div  className='w-[100px] text-[#ABB1B4] cursor-pointer bg-[#F4F5F7] text-[13px] rounded-[8px] grid justify-center 
      items-center h-[32px] px-2 '> Year To Date</div>
      </div> 

      <div className="w-full grid gap-[24px] justify-items-center ">
      <div  className='flex gap-20 p-5 pb-0' >
      <div className='w-[471px] h-[212px] bg-white rounded-[20px] px-[39px] py-[10px] ' >
      <h1  className=' text-[#646769] text-[18px] font-[700]  ' >  Sales Overview </h1>
      <div   className='py-[10px] grid grid-cols-[repeat(2,150px)] gap-x-[100px] gap-y-[10px] grid-rows-[repeat(2,70px)] ' >
        {
          Sales.map(Sale=>{
            return <span  key={Sale.id}  >
                  <SaleBuy {...Sale}  ></SaleBuy>
                  </span>
            })
        }
      

      </div>
      </div> 

      <div className='w-[471px] h-[212px] bg-white rounded-[20px] px-[39px] py-[10px] ' >
      <h1  className=' text-[#646769] text-[18px] font-[700]  ' >  Purchase Overview </h1>
      <div   className='py-[10px] grid grid-cols-[repeat(2,150px)] gap-x-[100px] gap-y-[10px] grid-rows-[repeat(2,70px)] ' >
      {Purchases.map(Purchase=>{
        return <span  key={Purchase.id}  >
               <SaleBuy  {...Purchase} ></SaleBuy>
              </span>
      }) }
      </div>
      </div> 
      </div>

      <div  className='flex gap-[55px]' >
        <div className='w-[303px] h-[210px] p-3 font-[700] bg-white rounded-[10px] ' >
          <h1    className=' text-[#646769] text-[18px] mb-4  '> invontry Details </h1>
          <article  className='grid gap-3 ' >
          <div className="flex justify-between p-1  items-center border-b-[#EBF1F7] border-b border-b-solid    ">
            <h1   className='text-[#B0B0B0] text-[14px]   '  >Low Stock Items</h1>
           <p  className='text-[#0D151D] text-[22px] ' > 05 </p>
          </div>
          <div className="flex justify-between p-1 items-center border-b-[#EBF1F7] border-b border-b-solid ">
            <h1  className='text-[#B0B0B0] text-[14px]   ' >Item Type</h1>
            <p  className='text-[#0D151D] text-[22px] ' >15</p>
          </div>
          <div className="flex justify-between p-1 items-center">
            <h1  className='text-[#B0B0B0] text-[14px]   ' >No of Items</h1>
            <p  className='text-[#0D151D] text-[22px] ' >120</p>
          </div>
          </article>
        </div>

        <div className='w-[303px] h-[210px] p-3 font-[700] bg-white rounded-[10px] ' >
          <h1    className=' text-[#646769] text-[18px] mb-4  '> Invoices Summary </h1>
          <article  className='flex gap-3 justify-center items-center ' >
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3  ">
          <Image src={paidinv} alt="" ></Image>
            <h1  className='text-[#B0B0B0] text-[15px] my-1' >Paid  Invoices</h1>
            <p  className='text-[#0D151D] text-[22px] ' >15</p>
          </div>
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3 ">
          <Image src={unpaidinv} alt="" ></Image>
            <h1  className='text-[#B0B0B0] text-[15px]  my-1 ' >UnPaid  Invoices</h1>
            <p  className='text-[#0D151D] text-[22px] ' >15</p>
          </div>
          </article>
        </div>

        <div className='w-[303px] h-[210px] p-3 font-[700] bg-white rounded-[10px] ' >
          <h1    className=' text-[#646769] text-[18px] mb-4  '>No.of Users </h1>
          <article  className='flex gap-3 justify-center items-center ' >
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3  ">
          <FaUsers  className='text-4xl text-[#346FE5] '></FaUsers>
            <h1  className='text-[#B0B0B0] text-[15px] my-1  ' >Total Customers</h1>
            <p  className='text-[#0D151D] text-[22px] ' >1.9K</p>
          </div>
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3 ">
          <FaUsers  className='text-4xl text-[#346FE5] '></FaUsers>
            <h1  className='text-[#B0B0B0] text-[15px]  my-1 ' >Total Suppliers</h1>
            <p  className='text-[#0D151D] text-[22px] ' >45</p>
          </div>
          </article>
        </div>
      </div>
      

      {/* Statistic */}
      <div className="w-[1031px] bg-white h-[406px] "></div>
      <div className='flex gap-[17px]  rounded-[10px] '>

      <div className="h-[351px] w-[503px] bg-white px-3 rounded-[10px] py-6 ">
      <h1    className=' text-[#646769] text-[18px] mb-4 font-[700]'>Sales</h1>
      <div className='flex gap-[10px] '>
      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3  ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700]'>   Best Suppliers  </h1>
    
     <div className='grid gap-3'>
     <div  className='h-[56px] w-[210px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
     </div>
      </div>

      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3 ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700] '>   Best Products </h1>
        <div className='grid gap-2  bg-white rounded-[10px]  '>
     <div  className='h-[56px] w-[210px] p-2 flex justify-between items-center border-b-[#EBF1F7] border-b border-b-solid   ' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 flex justify-between items-center border-b-[#EBF1F7] border-b border-b-solid ' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
     </div>
      </div>
      </div>
    
      </div>

      <div className="h-[351px] w-[503px] bg-white px-3 rounded-[10px] py-6 ">
      <h1    className=' text-[#646769] text-[18px] mb-4 font-[700]'>Purchases</h1>
      <div className='flex gap-[10px] '>
      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3  ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700]'>   Best Customers </h1>
    
     <div className='grid gap-3'>
     <div  className='h-[56px] w-[210px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
     </div>
      </div>

      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3 ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700] '>   Best Products </h1>
        <div className='grid gap-2  bg-white rounded-[10px]  '>
     <div  className='h-[56px] w-[210px] p-2 flex justify-between items-center border-b-[#EBF1F7] border-b border-b-solid   ' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 flex justify-between items-center border-b-[#EBF1F7] border-b border-b-solid ' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
      <div  className='h-[56px] w-[210px] p-2 flex justify-between items-center' > 
      <FaUsers  className='text-4xl'></FaUsers>   
        <h1>Meriem Allali </h1> 
       <p>80</p>   
      </div>
     </div>
      </div>
      </div>
      </div>

      </div>
     
    </div>
      
      </main>
    </>
  )
}
