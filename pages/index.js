import Head from 'next/head'
import SaleBuy from '../Componants/SellPurchaseElement';
import DashbordA from '../public/Dashbord+.png'
import {FaUsers} from "react-icons/fa";
import unpaidinv from '../public/unpaidinv.svg'
import paidinv from '../public/paidinv.svg'
import Image from 'next/image'
import {Line} from 'react-chartjs-2';
import {MdOutlineKeyboardArrowDown } from "react-icons/md";
import SideNavbar from '../Componants/SideNvar/SideNav';
import Navbar from '../Componants/Navbar';
import {GiBanana,GiOrange,GiShinyApple} from "react-icons/gi";
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  let State=[true,false,false,false,false,false,false,false]

  const [yearPicked,setYear]=useState(new Date(Date.now()).getFullYear());
      
     const yearSelected=(year)=>{
     switch (year) {
      case 2023:
        setYear(new Date(
          `2023-01-01T00:00:00+0000`
        ).getFullYear())
        break;
        case 2022:
          setYear(new Date(
            `2022-01-01T00:00:00+0000`
          ))
        break;
        case 2021:
          setYear(new Date(
            `2021-01-01T00:00:00+0000`
          ))
        break;
     }
     }
    


  const [BestProductHT, setBestProductHT] = useState()
  useEffect(() => { 
    setBestProductHT(null)
    axios.get(`http://localhost:3000/api/best/productAchat/${yearPicked}`)
    .then(res => {
      setBestProductHT(res.data.data)})
  }, [])



  const [BestProductVT, setBestProductVT] = useState()
  useEffect(() => { 
    setBestProductHT(null)
    axios.get(`http://localhost:3000/api/best/productVendu/${yearPicked}`)
    .then(res => {
      setBestProductVT(res.data.data)})
  }, [])

  const [Bestcustomer, setBestcustomer] = useState()
  useEffect(() => { 
    setBestcustomer(null)
    axios.get(`http://localhost:3000/api/best/customer/${yearPicked}`)
    .then(res => {
      setBestcustomer(res.data.data)})
  }, [])
  
  const [Bestsupplier, setBestsupplier] = useState()
  useEffect(() => { 
    setBestsupplier(null)
    axios.get(`http://localhost:3000/api/best/supplier/${yearPicked}`)
    .then(res => {
      setBestsupplier(res.data.data)})
  }, [])
  const [lowOnstock, setlowOnstock] = useState()
  useEffect(() => { 
    setlowOnstock(null)
    axios.get(`http://localhost:3000/api/notifie/lowStock`)
    .then(res => {
      setlowOnstock(res.data.data)})
  }, [])
  
  const [itemType, setitemType] = useState()
  useEffect(() => { 
    setitemType(null)
    axios.get(`http://localhost:3000/api/count/productType`)
    .then(res => {
      setitemType(res.data.data)})
  }, [])

  const [items, setitems] = useState()
  useEffect(() => { 
    setitems(null)
    axios.get(`http://localhost:3000/api/count/product`)
    .then(res => {
      setitems(res.data.data)})
  }, [])

  const [paidInvoices, setpaidInvoices] = useState()
  useEffect(() => { 
    setpaidInvoices(null)
    axios.get(`http://localhost:3000/api/count/invoice/paid`)
    .then(res => {
      setpaidInvoices(res.data.data)})
  }, [])

  const [UnPaidInvoices, setUnpaidInvoices] = useState()
  useEffect(() => { 
    setUnpaidInvoices(null)
    axios.get(`http://localhost:3000/api/count/invoice/unPaid`)
    .then(res => {
      setUnpaidInvoices(res.data.data)})
  }, [])

  const [AllCustomer, setAllCustomer] = useState()
  useEffect(() => { 
    setAllCustomer(null)
    axios.get(`http://localhost:3000/api/count/customer`)
    .then(res => {
      setAllCustomer(res.data.data)})
  }, [])
  const [AllSupplier, setAllSupplier] = useState()
  useEffect(() => { 
    setAllSupplier(null)
    axios.get(`http://localhost:3000/api/count/supplier`)
    .then(res => {
      setAllSupplier(res.data.data)})
  }, [])
  const [All, setAll] = useState()
  useEffect(() => { 
    setAll(null)
    axios.get(`http://localhost:3000/api/year/${yearPicked}`)
    .then(res => {
      setAll(res.data.data)
      setSales([
        { id:0,
          Type:0,
          Text:'Total Sales',
          nbr:res.data.data.sale
        },
        { id:1,
          Type:0,
          Text:'Revenu',
          nbr:res.data.data.TotalRevenu
        },
        { id:2,
          Type:0,
          Text:'Cost',
          nbr:res.data.data.TotalCostInvoice
        },
        { id:3,
          Type:0,
          Text:'profit',
          nbr:res.data.data.TotalRevenu
        },
      ]);
      setPurchases([
        { id:0,
          Type:1,
          Text:'No of Purchase',
          nbr:res.data.data.invoice
        },
        { id:1,
          Type:1,
          Text:'Paid Order',
          nbr:res.data.data.paidSale
        },
        { id:2,
          Type:1,
          Text:'Cost',
          nbr:res.data.data.TotalCostSale
        },
        { id:3,
          Type:1,
          Text:'Inpaid Order',
          nbr:res.data.data.UnPaidSale
        },
      ])
    });
      
  }, [])
  console.log(All)
  const [Sales,setSales]=useState([
    { id:0,
      Type:0,
      Text:'Total Sales',
      nbr:650
    },
    { id:1,
      Type:0,
      Text:'Revenu',
      nbr:'18K'
    },
    { id:2,
      Type:0,
      Text:'Cost',
      nbr:"18k"
    },
    { id:3,
      Type:0,
      Text:'profit',
      nbr:'8K'
    },
  ]);
  const [Purchases,setPurchases]=useState([
    { id:0,
      Type:1,
      Text:'No of Purchase',
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
  ]);
  const data = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12],
    datasets: [
      {
        label: 'Purchases',
        fill: true,
        lineTension: 0.1,
        backgroundColor: '#6892e378',
        borderColor: '#6892E3',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40,90, 40,70, 55,90,]
      },
      {
        label: 'Sales',
        fill: true,
        lineTension: 0.1,
        backgroundColor: '#DFF4FF',
        borderColor: '#23A5E5',
        borderCapStyle: "square",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [70, 80, 77, 40, 70, 55,70, 55,70, 40,70, 55,]
      }
    ],
  };
  const [YearSelected, setYearSelected] = useState(false)
 const dropdownhandel=e=>{
  setYearSelected(prev=>prev=!prev)
 
 }

 return (
    <>
      <Head >
        <>
        <title>GSTOCK</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        </>
         </Head>
   <div  className='grid grid-cols-[230px,1fr] relative w-full' >
         <SideNavbar State={State} className={` col-span-1 ` }  />
         <div   className=" col-start-[2] col-end-[3] ">
         <Navbar/>
         <main className={`w-full bg-[#F8F8F8] pb-[20px] `} >
      <div  className='flex h-[50px] bg-white px-5 relative ' >
      <div className={`flex gap-3 font-[700] text-[14px] py-3 items-center text-[#34393D]`}> 
      <Image alt='' src={DashbordA} ></Image>  Dashborad
      </div>
      <div className='grid gap-2  absolute top-[10%] right-5 ' >
      <span  className='w-[110px] cursor-pointer bg-[#F4F5F7] text-[13px] rounded-[4px] flex 
      justify-center items-center h-[32px] gap-1'  onClick={dropdownhandel} >
        <MdOutlineKeyboardArrowDown  className='text-lg' ></MdOutlineKeyboardArrowDown>  Select Year
      </span>
      { YearSelected && <ui  className='flex flex-col gap-1  ' >
      <li  className='w-[110px] cursor-pointer bg-[#F4F5F7] text-[13px] rounded-[4px] flex 
      justify-center items-center h-[32px] gap-1'  onClick={()=>{yearSelected(2023)}} >
       Year 2023
      </li>
      <li  className='w-[110px] cursor-pointer bg-[#F4F5F7] text-[13px] rounded-[4px] flex 
      justify-center items-center h-[32px]'  onClick={()=>{yearSelected(2022)}} > Year 2022
      </li>
      <li  className='w-[110px] cursor-pointer bg-[#F4F5F7] text-[13px] rounded-[4px] flex 
      justify-center items-center h-[32px] '  onClick={()=>{yearSelected(2021)}} >  Year 2021
      </li>
      </ui> }
      
      </div>

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
           <p  className='text-[#0D151D] text-[22px] ' > {lowOnstock} </p>
          </div>
          <div className="flex justify-between p-1 items-center border-b-[#EBF1F7] border-b border-b-solid ">
            <h1  className='text-[#B0B0B0] text-[14px]   ' >Item Type</h1>
            <p  className='text-[#0D151D] text-[22px] ' >{itemType}</p>
          </div>
          <div className="flex justify-between p-1 items-center">
            <h1  className='text-[#B0B0B0] text-[14px]   ' >No of Items</h1>
            <p  className='text-[#0D151D] text-[22px] ' >{items}</p>
          </div>
          </article>
        </div>

        <div className='w-[303px] h-[210px] p-3 font-[700] bg-white rounded-[10px] ' >
          <h1    className=' text-[#646769] text-[18px] mb-4  '> Invoices Summary </h1>
          <article  className='flex gap-3 justify-center items-center ' >
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3  ">
          <Image src={paidinv} alt="" ></Image>
            <h1  className='text-[#B0B0B0] text-[15px] my-1' >Paid  Invoices</h1>
            <p  className='text-[#0D151D] text-[22px] ' >{paidInvoices}</p>
          </div>
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3 ">
          <Image src={unpaidinv} alt="" ></Image>
            <h1  className='text-[#B0B0B0] text-[15px]  my-1 ' >UnPaid  Invoices</h1>
            <p  className='text-[#0D151D] text-[22px] ' >{UnPaidInvoices}</p>
          </div>
          </article>
        </div>

        <div className='w-[303px] h-[210px] p-3 font-[700] bg-white rounded-[10px] ' >
          <h1    className=' text-[#646769] text-[18px] mb-4  '>No.of Users </h1>
          <article  className='flex gap-3 justify-center items-center ' >
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3  ">
          <FaUsers  className='text-4xl text-[#346FE5] '></FaUsers>
            <h1  className='text-[#B0B0B0] text-[15px] my-1  ' >Total Customers</h1>
            <p  className='text-[#0D151D] text-[22px] ' >{AllCustomer}</p>
          </div>
          <div className="bg-[#F2F2F2] rounded-[15px] h-[129px] w-[138px] pt-5 px-3 ">
          <FaUsers  className='text-4xl text-[#346FE5] '></FaUsers>
            <h1  className='text-[#B0B0B0] text-[15px]  my-1 ' >Total Suppliers</h1>
            <p  className='text-[#0D151D] text-[22px] ' >{AllSupplier}</p>
          </div>
          </article>
        </div>
      </div>
      

      {/* Statistic */}
      <div className="w-[1031px] grid bg-white h-[500px] rounded-[20px] p-[20px] py-8 ">
      <h1  className=' text-[#646769] text-[18px] font-[700] px-[20px]  ' >  Sales And Purchases Statistics  </h1>
      <Line
      data={data}
      width={1000}
      options={{
        scales: {
            x: {
                grid: {
                    display:false
                }   
            }
        }
    }}
      height={450}
    />
      </div>
      <div className='flex gap-[17px]  rounded-[10px] '>

      <div className="h-[351px] w-[503px] bg-white px-3 rounded-[10px] py-6 ">
      <h1    className=' text-[#646769] text-[18px] mb-4 font-[700]'>Sales</h1>
      <div className='flex gap-[10px] '>
      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3  ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700]'>   Best Suppliers  </h1>
    
     <div className='grid gap-3'>
      {Bestsupplier && Bestsupplier.map(supplier=>{
        return  <div  key={supplier.supplier.codeF}
        className='h-[56px] w-[220px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
        <FaUsers  className='text-4xl'></FaUsers>   
          <h1>{supplier.supplier.nomF} {supplier.supplier.prenomF} </h1> 
         <p>{supplier.points}</p>   
        </div>
      }) }
     </div>
      </div>

      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3 ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700] '>   Best Products </h1>
   { BestProductHT &&    
   <div className='grid gap-2  bg-white rounded-[10px]  '>
    {BestProductHT.map(product=>{
      return   <div key={product.codeP}
       className='h-[56px] w-[210px] p-2 flex justify-between items-center border-b-[#EBF1F7] border-b border-b-solid   ' > 
      <GiBanana  className='text-4xl  text-[yellow] '></GiBanana>   
        <h1> {product.nomP} </h1> 
       <p>{product.qteAchat}</p>   
      </div>
    })}
    </div>}
      </div>
      </div>
    
      </div>

      <div className="h-[351px] w-[503px] bg-white px-3 rounded-[10px] py-6 ">
      <h1    className=' text-[#646769] text-[18px] mb-4 font-[700]'>Purchases</h1>
      <div className='flex gap-[10px] '>
      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3  ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700]'>   Best Customers </h1>
    
     <div className='grid gap-3'>
      {Bestcustomer && Bestcustomer.map(customer=>{
        return  <div  key={customer.customer.codeC}
        className='h-[56px] w-[210px] p-2 rounded-[10px] bg-white flex justify-between items-center' > 
        <FaUsers  className='text-4xl'></FaUsers>   
          <h1>{customer.customer.nomC} {customer.customer.prenomC} </h1> 
         <p>{customer.points}</p>   
        </div>
      }) }
     </div>
      </div>
      <div className='w-[237px] h-[257px] bg-[#F8F8F8] p-3 ' >
        <h1 className=' text-[#646769] text-[18px] mb-3 font-[700] '>   Best Products </h1>
    <div className='grid gap-2  bg-white rounded-[10px]  '>
  {BestProductVT && BestProductVT.map(product=>{
    return  <div key={product.produit.codeP}
     className='h-[56px] w-[210px] p-2 flex justify-between items-center border-b-[#EBF1F7] border-b border-b-solid   ' > 
    <GiBanana  className='text-4xl  text-[yellow] '></GiBanana>   
      <h1> {product.produit.nomP} </h1> 
     <p>{product.qte} </p>   
  </div>
  }) }
    </div>
      </div>
      </div>
      </div>

      </div>
     
    </div>
      
      </main>
         </div>

    </div>
   
    </>
  )
}
