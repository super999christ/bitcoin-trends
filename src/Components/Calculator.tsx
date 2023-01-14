import { useState } from "react";

const Calculator = ({rate} : any) => {

    const [valueone, setValueOne] = useState<number>(0);
    const [valuetwo, setValueTwo] = useState<number>(0);
    
    const handleChangeOne = (event : any) => {
        setValueOne(event.target.value);
        setValueTwo(event.target.value * rate);
    }
    const handleChangeTwo = (f : any) => {
        setValueTwo(f.target.value);
        setValueOne(f.target.value / rate);
    }

    return (
        <div className="calculator-wrapper">
            <input className="BTS_Number" onChange={handleChangeOne} aria-label = "Currency Amount Field" type="number" value={valueone}/>
            <span>BTS</span>
            &nbsp;
            <input className="USD_Number" onChange={handleChangeTwo} aria-label = "Currency Amount Field" type="number" value={valuetwo}/> 
            <span>EUR</span>
        </div>
    );
};

export default Calculator;