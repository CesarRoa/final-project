import { styled } from "styled-components";
import { useState, useEffect } from "react";
import ReactTable from 'react-table-6';

const DataProcess = ({data}) =>{
    const [actives, setActives] = useState(0);
    const [passives, setPassives] = useState(0);
    const balance = actives - passives;

    const {data:{basicInfo, profile, historical, _id}} = data;
    const {currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo;

    
    const check = monthlyExpenses.filter(item=>item.tag === "services")
    const processedData = monthlyExpenses.flatMap(item =>
        item.expenses.map(expense => ({
            date: expense.date,
            tag: expense.name,
            out: expense.amount,
            net: balance
        }))
    );

    console.log(processedData)
    const initialData = {date: profile.memberSince, tag:"Starting in BY",in:currentAmount,net: balance}
    processedData.push(initialData)


    const columns = [
        { Header: 'Date', accessor: 'date' },
        { Header: 'Tag', accessor: 'tag' },
        { Header: 'Withdraw', accessor: 'out' },
        { Header: 'Deposit', accessor: 'in' },
        { Header: 'Balance', accessor: 'net' },
    ];

return (
    <Div>
    <ReactTable
        data={processedData}
        columns={columns}
        className="table"
    />
    </Div>
    );
};
// const DataProcess = ({data}) =>{
//     const [actives, setActives] = useState(0);
//     const [passives, setPassives] = useState(0);
//     console.log(data)
//     const {data:{basicInfo, profile, historical, _id}} = data
//     const {currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo

//     useEffect(()=>{
//         const typePaidment = ["weekly", "biweekly"]
//         const salary = monthlyIncome.salary
//         setActives(currentAmount + salary)
//     },[])
//     console.log(monthlyIncome.typePaidment, monthlyIncome.date)
//     console.log(actives)

//     return(
//     <Div>
//         Data
//     </Div>
// )
// };

export default DataProcess;

const Div = styled.div`
/* height:300px;
width : 30%; */
border: green dashed 1px;
height: 70vh;
text-align: center;
`