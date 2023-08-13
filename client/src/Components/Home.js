import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile"
import Chart from "./Chart";
const Home = ({user}) =>{
    const data = user.data
    const profile = data.profile

    const navigate = useNavigate();
    const handleClickHitorical = ()=>{
        navigate(`/${profile.username}/historical`)
    }
    const handleClickTable = ()=>{
        navigate(`/${profile.username}/table`)
    }
return(
    <Div>
        <Div1>
        <Profile data = {data}/>
        </Div1>
        <Div2>
            Calculator
        </Div2>
        <Div3>
        <button
        onClick={handleClickHitorical}
        >Historical
        </button>
        <button
        onClick={handleClickTable}
        >Table
        </button>
        </Div3>
        <Div4>
        <Chart/>
        </Div4>
    </Div>
)
};

export default Home;

const Div = styled.div`
    display:grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr 3fr;
    gap: 10px;
    border: red solid 1px;
    height: 70vh;
`

const Div1 = styled.div`
    grid-column: 1 / span 1;
    grid-row: 1 / span 2;
    border: blue solid 1px;
`
const Div2 = styled.div`
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    border: green solid 1px;
`
const Div3 = styled.div`
    grid-column: 1 / span 1;
    grid-row: 3 / span 3;
    border: orange solid 1px;
`
const Div4 = styled.div`
    grid-column: 2 / span 1;
    grid-row: 2 / span 3;
    border: purple solid 1px;
`