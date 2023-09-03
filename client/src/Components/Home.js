import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile"
import Chart from "./Chart";
import Search from "./Search";
import Form from "./Form";
import Check from "./Check";
import {AiOutlineMenuUnfold, AiOutlineSearch, AiOutlineCheckSquare} from "react-icons/ai";

const Home = ({user}) =>{
    const [form, setForm] = useState(false)

    const data = user.data
    const profile = data.profile

    const navigate = useNavigate();
    const handleClickHitorical = ()=>{
        navigate(`/${profile.username}/historical`)
    }
    const handleClickAdd = ()=>{
        navigate(`/${profile.username}/add`)
    }

return(
    <Div>
        <Div1 >
        <FirstDiv>
            <AiOutlineMenuUnfold style={{height: "50px", fontSize:"50px"}}/>
            <p> Info </p>
                <DivProfile>
                <Profile profile = {data.profile} basicInfo = {data.basicInfo}/>
                </DivProfile>
        </FirstDiv>
        <SecondDiv>
            <AiOutlineSearch style={{height: "50px", fontSize:"50px"}}/>
            <p> Search </p>
                <DivSearch>
                <Search/>
                </DivSearch>
        </SecondDiv>
        <ThirdDiv>
            <AiOutlineCheckSquare style={{height: "50px", fontSize:"50px"}}/>
            <p> Check Budget </p>
                <DivCheck>
                <Check/>
                </DivCheck>
        </ThirdDiv>
        </Div1 >
        <Div2>
            <button onClick={()=>{setForm(true)}}>Add Entry</button>
        {form && <Form setForm = {()=>{setForm(false)}}/>}
        </Div2>
        <Div3>
        <button
        onClick={handleClickHitorical}
        >History
        </button>
        </Div3>
        <Div4>
        <Chart data = {user}/>
        </Div4>
    </Div>
)
};

export default Home;

const Div = styled.div`
position: relative;
padding-top: 20vh;
padding-bottom: 9vh;
display:grid;
grid-template-columns: 1fr 4fr;
grid-template-rows: 1fr 3fr;
gap: 10px;
height: 70vh;
`
const Div1 = styled.div`
position: relative;
display:flex;
flex-direction:column;
justify-content: center;
align-items: left;
grid-column: 1 / span 1;
grid-row: 1 / span 2;
&>* {
    margin-bottom: 10px;
}
`
const DivProfile = styled.div`
transform: translateX(-100%);
transition: transform 0.3s ease-in-out;
`
const DivSearch = styled.div`
transform: translateX(-100%);
transition: transform 0.3s ease-in-out;
`
const DivCheck = styled.div`
transform: translateX(-100%);
transition: transform 0.3s ease-in-out;
`
const FirstDiv = styled.div`
&:hover ${DivProfile}{
    transform: translateX(0%);
}
`
const SecondDiv = styled.div`
&:hover ${DivSearch} {
    transform: translateX(0%);
}
`
const ThirdDiv = styled.div`
&:hover ${DivCheck} {
    transform: translateX(0%);
}
`
const Div2 = styled.div`
display:flex;
align-items: center;
justify-content:center;
grid-column: 2 / span 1;
grid-row: 1 / span 1;
`
const Div3 = styled.div`
grid-column: 1 / span 1;
grid-row: 3 / span 3;
display: flex;
justify-content: space-around;

`
const Div4 = styled.div`
grid-column: 2 / span 1;
grid-row: 2 / span 3;
`
