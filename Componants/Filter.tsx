interface props{
    Filter:boolean,
    Nbr:number,
    Title:string
}

const FilterElmnt:React.FC<props> = (props) => {
    return ( 
        <div  className= {`flex items-center gap-2 cursor-pointer px-2 py-2 rounded-t-lg rounded-tr-lg text-[16px]
        ${props.Filter && "bg-white text-black"} ${!props.Filter && "text-[#959B9F]  bg-[#ECF2FE] "}`}  >{props.Title}
        <div  className={`rounded-full grid justify-center items-center ${!props.Filter && "bg-[#9EC2F6]"}
         ${props.Filter && "bg-[rgba(58,120,241,1)] text-white"} h-[24px] w-[34px] text-[12px]`} >{props.Nbr}</div> 
        </div>
     );
}
//  
export default FilterElmnt;