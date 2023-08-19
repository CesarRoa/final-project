import { styled } from "styled-components";
const Historical = ({user}) =>{
    return(
    <Div>
        <h1>
        Historical
        Data for:
        {user.data.profile.username}
        </h1>
    </Div>
)
};

export default Historical;

const Div = styled.div`
border: red solid 1px;
height: 70vh;
text-align: center;
`