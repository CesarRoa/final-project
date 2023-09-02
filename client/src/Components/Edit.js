import { styled } from "styled-components";
import { useState, useContext, useRef} from "react";
import { FetchUpdate, FetchDelete } from "./Fetch/handlers";
import { UserContext } from "./Context";

const Edit = ({rowData, setEdit, FetchLatestData}) => {
    const {user, setUser} =useContext(UserContext)
    const [change, setChange] =useState(rowData)
    const [confirm, setConfirm] =  useState (false);

    const username = user.data.profile.username
    const date = change.date
    const target = {
        name: change.name,
        amount: change.amount
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await FetchUpdate(username, date, target)
            .then((res) => {
                console.log(res)
                setEdit()
            })
            await FetchLatestData()
            .then((res) => {
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
    };

return (
    <Wrapper
    className="Wrapper"
    onClick={(e)=>{
        if(e.target === e.currentTarget){
            setEdit()}
        }}
    >
        <Div>
            {Object.entries(rowData).map(([key,value])=>{
                if (key === "date" || key === "name"){
                    return(
                        <div key ={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
                        <p>{value}</p>
                        </div>
                    )
                } else if( key === "amount" && value < 0){
                    return(
                        <div key ={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
                        <p>{-value}</p>
                        </div>
                    )
                } else if( key === "amount" && value > 0){
                    return(
                        <div key ={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
                        <p>{value}</p>
                        </div>
                    )
                }
            })}
            <Form
                onSubmit={handleSubmit}
            >
                <div className="form">
                    <label>
                        New Amount
                    </label>
                    <input
                    type="number"
                    id="newAmount"
                    name="newAmount"
                    onChange={(e)=>{
                        if(change.tag === "passive"){
                            setChange({
                                ...change,
                                amount: -e.target.value
                            })
                        }else {
                            setChange({
                                ...change,
                                amount: e.target.value
                            })
                        }
                        }}>
                    </input>
                </div>
                <div className="buttons">
                <button
                    type="submit"
                >
                    Edit
                </button>
                <button
                    onClick={async(e)=>{
                        e.preventDefault();
                        try{
                            await FetchDelete(username, date, target)
                            .then((res) => {
                                console.log(res)
                                setEdit()
                            })
                            await FetchLatestData()
                            .then((res) => {
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
                    }}
                    >Delete
                </button>
                </div>
            </Form>
        </Div>
    </Wrapper>
)
}

export default Edit

const Wrapper = styled.div`
position: fixed;
z-index: 1;
left:0;
top: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0,0,0,0.4);
`
const Div = styled.div`
display:flex;
flex-direction: column;
border-radius:25px;
padding: 2rem;
background-color: white;
width: 25em;
align-items: center;
justify-content: center;

&>div{
    width: 50%;
    display:flex;
    flex-direction: row;
    padding: 15px;
    justify-content: space-between;

    &>label{
        font-weight: bold;

    }
}
`
const Form = styled.form`
width: 80%;
display: block;
&>div.form{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    padding: 15px;
    &>label{
        color: blue;
        font-weight: bolder;
        margin-bottom: 10px;
    }

}
&>div.buttons{
    display: flex;
    flex-direction:row;
    justify-content: space-between;
}
`