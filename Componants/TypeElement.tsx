interface props{
    name:string;
    designation:string;
    Nbr:number;
}

const Element:React.FC<props> = (props) => {
    return ( 
        <div>
            <h1> {props.name} </h1>
            <h1> {props.Nbr} </h1>
            <h1> {props.designation} </h1>
        </div>
     );
}
 
export default Element;