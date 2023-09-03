import { styled } from "styled-components";
import { useState } from "react";
import Clock from "./Clock";
import Terms from "./Terms";

const Footer = () =>{
    const [visible, setVisible] = useState(false)

    return(
    <Div>
        <button>
            Contact Us
        </button>
        <Clock/>
        <button
        onClick={ ()=>{
            setVisible(true)
        }}
        >
            Terms and Conditions
        </button>
        {visible && <Terms setVisible = {()=>{setVisible(false)}}/>}
    </Div>
)
};

export default Footer;

const Div = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
border-top: #ff66c4 ridge 0.2em;
height: 9vh;
text-align: center;
align-items:center;
&>button{
    margin-left: 50px;
}
`