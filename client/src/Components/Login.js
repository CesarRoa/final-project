import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
    });
    const [userInfo, setUserInfo] = useState({})

    const navigate = useNavigate();
    const register = [
        {name: "username", label: "User Name", type: "text", placeholder:"joedoe12", function:{}},
        {name: "name", label: "First Name", type: "text", placeholder:"Joe", function:{}}, 
        {name: "lastname", label: "Last Name", type: "text", placeholder:"Doe", function:{}}, 
        {name: "email", label: "E-Mail", type: "email", placeholder:"joedoe12@aol.com", function:{}}, 
        {name: "phone", label: "Phone Number", type: "number", placeholder:"101 100 1011", function:{}}, 
        // {name: "city", label: "City", type: "text", placeholder:"Your City", function:{}}, 
        // {name: "postalcode", label: "Postal Code", type: "text", placeholder:"X0X 0X0", function:{}},
        {name: "password", label: "Password", type: "password", placeholder:"123456", function:{}}, 
        {name: "confirmPassword", label: "Confirm Password", type: "password", placeholder:"123456", function:{}}
    ];

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        // replace with search in db
        setUsernameTaken(event.target.value === 'takenUsername');
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    
        const requirements = {
            length: event.target.value.length >= 6,
            uppercase: /[A-Z]/.test(event.target.value),
            lowercase: /[a-z]/.test(event.target.value),
            digit: /\d/.test(event.target.value),
        };
    
        setPasswordRequirements(requirements);
    };
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(username && password){
            navigate(`/newAccount/${username}/registration`)
        }
    }
    console.log(userInfo)
return(
    <Wrapper>
        <Form
        onSubmit={handleSubmit}
        >
            {register.map((item)=>{
                return (
                    <div key={item.name}>
                    <label>{item.label}</label>
                    <input 
                    // value={item.name} 
                    type= {item.type} 
                    placeholder={item.placeholder} 
                    onChange={
                        item.name === 'username'
                        ? handleUsernameChange
                        : item.name === 'password'
                        ? handlePasswordChange
                        : null
                    }
                    />

                    {item.name === 'username' && usernameTaken && (
                        <Div className="error-message">Username already exists</Div>
                        )}
                    {item.name === 'password' && (
                    <Div2 className="password-requirements">
                        <div
                        className={`requirement ${
                            passwordRequirements.length ? 'fulfilled' : ''
                        }`}
                        >
                        Minimum length of 6 characters
                        </div>
                        <div
                        className={`requirement ${
                            passwordRequirements.uppercase ? 'fulfilled' : ''
                        }`}
                        >
                        At least one uppercase letter
                        </div>
                        <div
                        className={`requirement ${
                            passwordRequirements.lowercase ? 'fulfilled' : ''
                        }`}
                        >
                        At least one lowercase letter
                        </div>
                        <div
                        className={`requirement ${
                            passwordRequirements.digit ? 'fulfilled' : ''
                        }`}
                        >
                        At least one digit
                        </div>
                    </Div2>
                    )}

                    </div>
                )
            })}
            <button
            type="submit"
            >Register</button>
        </Form>
    </Wrapper>
)
};

export default CreateAccount;

const Wrapper = styled.div`
border: red solid 1px;
height: 70vh;
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: red dashed 1px;
height:80%;
width:100vw;
&>div{
    width: 50%;
    display: inline-flex;
    justify-content:space-between;
    margin-bottom: 0.5em;
}
&>button{
    margin-top: 1em ;
}
`
const Div = styled.div`
height: 1.94em;
width: 250px;
display: flex;
position: absolute;
right: 80px;
color: red;
align-items: center;
border: 1px red solid;
`

const Div2 = styled.div`
height: 5em;
width: 250px;
display: flex;
flex-direction: column;
position: absolute;
right: 80px;
color: red;
align-items: flex-start;
&>div{
    margin-bottom: 2px;
    &.fulfilled{
        color: green;
    }
}
`
