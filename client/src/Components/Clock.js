import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { HiMiniClock } from 'react-icons/hi2';

const Clock = () =>{
    const [time, setTime] = useState(new Date())

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(new Date())
        }, 1000);
        return ()=>{
            clearInterval(timer);
        }
    },[]);

    const dateOption = {year: 'numeric', month: 'long', day: 'numeric'};
    const currentHour = time.toLocaleTimeString();
    const currentDate = time.toLocaleDateString(undefined, dateOption);

    return(
        <>
        <Div>
        <HiMiniClock style={{fontSize: "1em"}}/>
            <div>
                Local time:  
                {" " + currentHour}
            </div>
            <div>
                Date:
                {" " + currentDate}
            </div>
        </Div>
</>
)
};

export default Clock;

const Div = styled.div`
position: absolute;
right: 17px;
bottom: 17px;
border: green dashed 1px;
text-align: center;
`