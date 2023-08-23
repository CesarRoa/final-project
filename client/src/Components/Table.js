import { styled } from "styled-components";
import { useState, useEffect} from "react";


const Table = ({ user }) => {
    const [paymentData, setPaymentData] = useState([]);
    const {data:{basicInfo, profile, historical, _id}} = user;
    const {currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo;
    const { tag, amount, date, frequency } = monthlyIncome;

    const calculatePaymentDates = () => {
        const paymentDates = [];

        const startDate = new Date(date);
        let currentDate = new Date(startDate);

        while (currentDate < new Date()) {
        paymentDates.push(new Date(currentDate));

        if (frequency === 1) {
            currentDate.setDate(currentDate.getDate() + 7);
        }else
        if (frequency === 2) {
            currentDate.setDate(currentDate.getDate() + 14);
        } else 
        if(frequency === 4){
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    }

        return paymentDates;
    };

    const paymentDates = calculatePaymentDates();

    const renderTableRows = () => {
    return paymentDates.map((paymentDate, index) => (
        <tr key={index}>
        <td>{paymentDate.toDateString()}</td>
        <td>{monthlyIncome.amount}</td>
        </tr>
        ));
    };

    return (
    <>
    <div>
        <h2>Payment Table</h2>
        <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Deposit</th>
                <th>Withdraw</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    </div>
    </>
    );
}

export default Table;

const Div = styled.div`
border: red solid 1px;
height: 70vh;
text-align: center;
`