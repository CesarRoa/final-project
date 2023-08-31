import { styled } from "styled-components";
import {useTable, useSortBy} from 'react-table';
import { useState, useEffect } from "react";
import { getMonthName, ProcessData } from "./Functions/Functions";
import React from "react";
import Loading from "../Loading";

const Historical = ({user}) =>{
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true)
    const [table, setTable] = useState([])

//
    const {data:{basicInfo, profile, historical, _id}} = user;
//

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const startingDate = basicInfo.memberSince;
    const startingMemberYear = startingDate.split("-")[0]
    const startYear = Number(startingMemberYear);
    const endYear = new Date().getFullYear()
    const years = Array.from({ length: (endYear - startYear + 1) }, (_, index) => startYear + index);

    // set options only to available months since starting the app
    const currentMonthIndex = new Date().getMonth()
    const startingMonthIndex = startingDate.split("-")[1]
    const activeMonths = months.slice(startingMonthIndex-1,currentMonthIndex+1)

    useEffect(()=>{
        const year = startYear
        const month = getMonthName(startingDate)
        setMonth(month)
        setYear(year)
        setIsLoading(false)
    },[])

    useEffect(()=>{
    let points = ProcessData(user, year, month)

    let modification = []

    if (Array.isArray(points)) {
        modification = points.map(point =>{
            if (point.tag !== "passive"){
            return {
                ...point,
                in: point.amount,
                net: point.y
            }
        } else {
            return{
                ...point,
                out: -point.amount,
                net: point.y
            }
        }
    })}

    setTable(modification)
    },[ year, month])

    const data = React.useMemo(()=>table,[table])
    const columns = React.useMemo(()=>[
        { Header: 'Date', accessor: 'date' , disableSortBy: false},
        { Header: 'Name', accessor: 'name', disableSortBy: true},
        { Header: 'Withdraw', accessor: 'out', disableSortBy: true},
        { Header: 'Deposit', accessor: 'in' , disableSortBy: true},
        { Header: 'Balance', accessor: 'net' , disableSortBy: true},
    ],[user, year, month]);

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

    const handleChange = (e) =>{
        let target = e.target.name
            if(target === "month"){
                setMonth(e.target.value)
            }
            if(target === "year"){
                setYear(e.target.value)
            }
        }
    return(
    <Div>
        {isLoading?
        <Loading/>:
        <>
            Historical
            <select
                value = {month}
                name = "month"
                onChange = {handleChange}
                >
                    {activeMonths.map(month =>(
                        <option
                        key={month} 
                        value={month}
                        >
                        {month}
                    </option>
                    ))}
                    </select>
                <select
                value = {year}
                name = "year"
                onChange = {handleChange}
                >
                    {years.map(year => (
                        <option 
                        key={year} 
                        value={year}
                        >
                    {year}
                    </option>
                    ))}
                </select>
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
            </>
        }
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