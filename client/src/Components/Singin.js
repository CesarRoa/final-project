import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect} from "react";
import { UserContext } from "./Context";
import { FetchUser } from "./Fetch/handlers";

const Signin = () =>{
    const {user, setUser} = useContext(UserContext);
    const [signIn, setSignIn] = useState({username:"", password: ""});

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/newAccount")
    };

    useEffect(()=>{
        FetchUser(signIn)
    }, [signIn])

    const handleSubmit = (e) =>{
        e.preventDefault();
        setSignIn({
            username: e.target.username.value,
            password: e.target.password.value,
        });
    };
    console.log(signIn)

return(
    <Wrapper>
        <h1>Sign In</h1>
        <Div>
            <Form
            onSubmit={handleSubmit}
            >
                <div>
                    <label
                    htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                    type="text"
                    id="username"
                    name="username"
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
                    type="password"
                    id="password"
                    name="password"
                    >
                    </input>
                </div>
                <button
                type="submit"
                >Sign in</button>
            </Form>
            <DivOptions>
                <Div className="create">
                    <span>
                        Not a member?
                    </span>
                    <button
                    onClick={handleClick}
                    >Register</button>
                </Div>
                <Div className="reset">
                    <span>
                        Forgot your password?
                    </span>
                    <button
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
border: red solid 1px;
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
border: red solid 1px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
&.create, &.reset{
    border: red dashed 1px;
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
& > div{
    margin: 50px 0;
    width: auto;
    /* height: 70px; */
    align-items: center;
    &>input{
        margin-left: 30px;
    }
}
`
const DivOptions = styled.div`
display: flex;
flex-direction: row;
`