import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "./Clock";
import Terms from "./Terms";

const Footer = () =>{
    const [visible, setVisible] = useState(false)

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/contactUs");
    };

    return(
    <Div>
        <button
        onClick={handleClick}
        >
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
position: fixed; 
background-color: white;
bottom: 0;
left: 0;
right: 0;
display: flex;
flex-direction: row;
justify-content: space-around;
border-top: #ff66c4 ridge 0.2em;
height: 9vh;
text-align: center;
align-items:center;
z-index:10;
&>button{
    margin-left: 50px;
}
`