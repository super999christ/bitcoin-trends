import { useState } from "react";

const Calculator = ({rate} : any) => {

    const [value, setValue] = useState<number>(1);

    
    const handleChangeOne = (event : any) => {
        setValue(event.target.value);
    }

    const handleChangeTwo = (event : any) => {
        setValue(event.target.value);
    }

    return (
        <div className="calculator-wrapper">
            <input className="BTS_Number" onChange={handleChangeOne} aria-label = "Currency Amount Field" type="number" value={value}/>
            <span> BTS</span>
            &nbsp;
            <input className="USD_Number" onChange={handleChangeTwo} aria-label = "Currency Amount Field" type="number" value={value * rate}/> 
            <span> USD</span>
        </div>
    );
};

export default Calculator;