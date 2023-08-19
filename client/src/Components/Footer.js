import { styled } from "styled-components";
import Clock from "./Clock";

const Footer = () =>{
    return(
    <Div>
        <h1>Footer</h1>
        <Clock/>
    </Div>
)
};

export default Footer;

const Div = styled.div`
display: flex;
flex-direction: row;
/* border: red solid 1px; */
border-top: #ff66c4 ridge 0.2em;
height: 9vh;
text-align: center;
`