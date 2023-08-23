import { styled } from "styled-components";
import {useTable, useSortBy} from 'react-table';
import React from "react";

const Historical = ({user}) =>{
    const {data:{basicInfo, profile, historical, _id}} = user;
    const {memberSince, currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo;
    let currentBalance = currentAmount

    const processData = [
        {
            date: memberSince, 
            name:"Initial Balance",
            in:currentAmount,
            net: currentBalance},
        ...monthlyExpenses.flatMap(item =>
            item.expenses.map(expense => {
                if(expense.tag === "passive"){
                    currentBalance -= expense.amount;
                }else {
                    currentBalance -= expense.amount;
                }
            return {
                date: expense.date,
                name: expense.name,
                out: expense.amount,
                net: currentBalance
            }}
        ))
    ]

    const data = React.useMemo(()=>processData,[])
    const columns = React.useMemo(()=>[
        { Header: 'Date', accessor: 'date' , disableSortBy: false},
        { Header: 'Name', accessor: 'name', disableSortBy: true},
        { Header: 'Withdraw', accessor: 'out', disableSortBy: true},
        { Header: 'Deposit', accessor: 'in' , disableSortBy: true},
        { Header: 'Balance', accessor: 'net' , disableSortBy: true},
    ],[]);

    const   {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                {
                    id: 'date',
                    desc: true
                }
                ]
            }
            },
        useSortBy
    );

    return(
    <Div>
        <h1>
        Historical
        </h1>
        <StyledTable {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <StyledHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                        <span>
                        {column.isSorted
                            ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                            : ''}
                        </span>
                    </StyledHeader>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
            prepareRow(row);
            return (
                <StyledRow  {...row.getRowProps()}>
                {row.cells.map(cell => (
                    <StyledCell  {...cell.getCellProps()}>{cell.render('Cell')}</StyledCell >
                ))}
                </StyledRow >
            );
            })}
        </tbody>
        </StyledTable>
    </Div>
)
};

export default Historical;

const Div = styled.div`
border: red solid 1px;
height: 70vh;
text-align: center;
`

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const StyledHeader = styled.th`
    padding: 8px 12px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    text-align: left;
`;

const StyledRow = styled.tr`
    &:nth-child(odd) {
        background-color: #f9f9f9;
    }
`;

const StyledCell = styled.td`
    padding: 8px 12px;
    border: 1px solid #ccc;
`;