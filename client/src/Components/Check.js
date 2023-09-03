import { styled } from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { useState } from "react";


const Check = () =>{
    const [startDate, setStartDate] = useState(new Date());
    return(
    <Div>
        <Form
        >
            <div>
                <label>Select Date:</label>
                <DatePicker 
                        selected={startDate} 
                        onChange={(date) => {
                            const dateObj = new Date(date);
                            const year = dateObj.getFullYear();
                            const month = String(dateObj.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed, so add 1
                            const day = String(dateObj.getDate()).padStart(2, '0');
                            const formattedDate = `${year}-${month}-${day}`;
                            setStartDate(date)
                        }} 
                        dateFormat="yyyy-MM-dd"
                    />
                <input></input>
                <button>Check</button>
            </div>
        </Form>
    </Div>
)
};

export default Check;

const Div = styled.div`
`

const Form = styled.form`
`