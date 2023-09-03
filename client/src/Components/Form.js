import { styled } from "styled-components";
import { useState, useEffect, useContext, useRef} from "react";
import { UserContext } from "./Context";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import {FetchNewEntry, FetchLatestData} from "./Fetch/handlers"

const Form = ({setForm}) => {
    const {user, setUser} =useContext(UserContext)
    const username = user.data.profile.username

    const userRef = useRef();

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    let initialState = {
        date: null,
        amount: 0,
        name: null,
        tag: null
    }
    const [startDate, setStartDate] = useState(new Date());
    const [entry, setEntry] = useState(initialState)

    const handleChange = (e) => {
        const absAmount = Math.abs(entry.amount)
        if(e.target.value === "passive"|| e.target.value === "budget"){
            setEntry({
                ... entry,
                tag: e.target.value,
                amount: -absAmount
            });
        }else if(e.target.value === "active" && entry.amount <0){
            setEntry({
                ... entry,
                tag: e.target.value,
                amount: absAmount
            });
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await FetchNewEntry(entry, username, entry.date)
            .then((res) => {
                console.log(res)
                setForm()
            })
            await FetchLatestData()
            .then((res)=>{
                console.log(res)
                setUser({
                    ...user,
                    data: res
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
    console.log(JSON.stringify(entry))
    return (
    <Wrapper
    className="Wrapper"
    onClick={(e)=>{
        if(e.target === e.currentTarget){
            setForm()}
        }}
    >
        <Div>
            <form
            onSubmit={handleSubmit}
            >
                <div>
                    <p>Selected Date:</p>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date) => {
                            const dateObj = new Date(date);
                            const year = dateObj.getFullYear();
                            const month = String(dateObj.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed, so add 1
                            const day = String(dateObj.getDate()).padStart(2, '0');
                            const formattedDate = `${year}-${month}-${day}`;
                            setStartDate(date)
                            setEntry({
                                ...entry,
                                date: formattedDate
                            })
                        }} 
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div>
                    <p>
                        Name:
                    </p>
                    <input
                        ref={userRef}
                        autoComplete="off"
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e)=>{
                            setEntry({
                                ...entry,
                                name: e.target.value
                            })
                        }}
                    >
                    </input>
                </div>
                <div>
                    <p>
                        Amount:
                    </p>
                    <input
                        type="text"
                        autoComplete="off"
                        id="amount"
                        name="amount"
                        onChange={(e)=>{
                            setEntry({
                                ...entry,
                                amount: parseFloat(e.target.value)
                            })
                        }}
                    >
                    </input>
                </div>
                <div className="divTag">
                    <p>
                        Tag:
                    </p>
                    <label>
                    <input
                    autoComplete="off"
                    type="radio"
                    value="active"
                    name="tagGroup"
                    onChange={handleChange}
                    />
                    Active
                    </label>
                    <label>
                    <input
                    type="radio"
                    value="passive"
                    name="tagGroup"
                    onChange={handleChange}
                    />
                    Passive
                    </label>
                    <label>
                    <input
                    type="radio"
                    value="budget"
                    name="tagGroup"
                    onChange={handleChange}
                    />
                    New Budget
                    </label>
                </div>
                <button>Add Entry</button>
            </form>
        </Div>
    </Wrapper>
)
}

export default Form

const Wrapper = styled.div`
position: fixed;
top: 22vh;
left:0;
bottom: 10vh;
width: 100%;
height: 100%;
z-index: 1000;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0,0,0,0.4);
`
const Div = styled.div`
position: absolute;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius:25px;
padding: 2rem;
background-color: white;
width: 25em;
&>form{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &>div{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        &>p{
            font-weight:bold;
        }
        &>input{
            text-align: center;
            margin-top: 5px;
        }
    }
    &>.divTag{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }
}
`