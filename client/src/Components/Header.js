import { styled } from "styled-components";
import BYA from "../images/BYA.png"
import { useNavigate } from "react-router-dom";
const Header = () =>{
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate("/")
    }
return(
    <Div>
        <Logo 
        src={BYA} 
        alt="logo"
        onClick={handleClick}
        />
        <h1>Header</h1>
        <button
        onClick={handleClick}
        >Sign In</button>
    </Div>
)
};

export default Header;

const Div = styled.div`
border: red solid 1px;
height: 20vh;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 15px;
& h1{
    justify-content: center;
    margin: 50px;
    
}

`

const Logo = styled.img`
width:15vw;
border: black solid 2px;
border-radius: 200px;
`