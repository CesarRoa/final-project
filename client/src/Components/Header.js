import { styled } from "styled-components";
import BYA from "../images/BYA.png"
import { useNavigate } from "react-router-dom";


const Header = ({user, setUser}) =>{
    /*
    1. Sign in / Log out button, if user is define
    */
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate("/")
    }

    const logOut = () =>{
        setUser(null);
        localStorage.clear()
        navigate("/")
    }

return(
    <Div>
        <Logo 
        src={BYA} 
        alt="logo"
        onClick={handleClick}
        />
        {!user?
            <button
            onClick={handleClick}
            >Sign In</button>
            :
            <button
            onClick={
                logOut
            }
            >Log Out</button>
        }
    </Div>
)
};

export default Header;

const Div = styled.div`
position: fixed;
top:0;
right:0;
left: 0;
background-color: white;
border-bottom: 0.2em #5170ff ridge ;
height: 20vh;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 15px;
z-index: 10;
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