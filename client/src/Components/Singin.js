import { styled } from "styled-components";
const Signin = () =>{
return(
    <Wrapper>
        <h1>Sign In</h1>
        <Div>
            <Form>
                <div>
                    <label>
                        Username
                    </label>
                    <input
                    type=""
                    placeholder="JoeDoe1"
                    >
                    </input>
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input
                    type="password"
                    >
                    </input>
                </div>
                <div>
                <button>Log in</button>
                <button>Create Account</button>
                </div>
            </Form>
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
width: 500px;
border: red solid 1px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-around;
`

const Form = styled.form`
& > div{
    margin: 30px 0;
    font-size: 2em;
    width: 500px;
    height: 70px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &>input{
        height: 30px;
        width: 50%;
        margin-left: 30px;
    }
}
`