import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef} from "react";
import { UserContext } from "./Context";
import { FetchUser } from "./Fetch/handlers";

const Signin = () =>{
    /*
    1. Context to store data from user. 
    2. States to compare username and password and prompt error in due case.
    3. Ref to focus on inputs.
    4. Navigation to other components as needed.
    */
    const {setUser} = useContext(UserContext);
    const userRef = useRef();
    const [errMessage, setErrMessage] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        setErrMessage("");
    },[name, pwd]);

    const navigate = useNavigate();

    const handleClick = (e) =>{
        const value = e.target.value;
        if(value === "reset"){
            navigate("/resetPassword");
        }
        if(value ==="register"){
            navigate("/newAccount");
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await FetchUser({
                username: e.target.username.value,
                password: e.target.password.value,
            })
            .then((res) => {
                setUser(res);
                localStorage.setItem('token', res.accessToken)
            })
        }
        catch(error){
            setErrMessage(error.message);
        }
    };

return(
    <Wrapper>
        <h1>Sign In</h1>
        <Div>
            <Form
            onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input
                    autoComplete="off"
                    type="text"
                    id="username"
                    ref={userRef}
                    name="username"
                    className="input-highlight"
                    onChange={(e)=>setName(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <label
                    htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                    autoComplete="off"
                    type="password"
                    id="password"
                    name="password"
                    className="input-highlight"
                    onChange={(e)=>setPwd(e.target.value)}
                    >
                    </input>
                </div>
                <button
                type="submit"
                >Sign in</button>
                {errMessage&&
                <div>
                <Error>
                    Error: {errMessage}
                </Error>
                </div>
                }
            </Form>
            <DivOptions>
                <Div className="create">
                    <span>
                        Not a member?
                    </span>
                    <button
                    value="register"
                    onClick={handleClick}
                    >Register</button>
                </Div>
                <Div className="reset">
                    <span>
                        Forgot your password?
                    </span>
                    <button
                    value="reset"
                    onClick={handleClick}
                    >Reset Password</button>
                </Div>
            </DivOptions>
        </Div>
    </Wrapper>
)
};

export default Signin;

const Wrapper = styled.div`
position: relative;
top: 23vh;
height: 70vh;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`
const Div = styled.div`
height: 500px;
width: 700px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
&.create, &.reset{
    height: auto;
    width: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
}
`

const Form = styled.form`
border: 0.5px solid silver;
padding: 2rem;
border-radius: 15px;
& > div{
    margin: 50px 0;
    width: auto;
    align-items: center;
    &>input{
        margin-left: 30px;
        border-radius: 5px;
    }
    &>#username:focus,  &>.input-highlight:focus {
    outline: none;
    border: 1px solid #4A90E2;
    box-shadow: 0 0 5px #4A90E2;
}
}
`
const DivOptions = styled.div`
display: flex;
flex-direction: row;
`

const Error = styled.p`
color:red;
font-size: 2rem;
`