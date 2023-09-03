import { styled } from "styled-components";
import {useTable, useSortBy} from 'react-table';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context";
import { getMonthName, ProcessData, getPreviousMonth} from "./Functions/Functions";
import React from "react";
import Loading from "../Loading";
import {LuEdit3} from "react-icons/lu"
import Form from "./Form";
import Edit from "./Edit";
import {FetchLatestData} from "./Fetch/handlers"

const Historical = ({user}) =>{
    const {balances, setBalances} = useContext(UserContext)
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true)
    const [table, setTable] = useState([])

    const [editedRowValues, setEditedRowValues] = useState({});

    const [form, setForm] = useState(false)
    const [edit, setEdit] = useState(false)

//
    const {data:{basicInfo, ...rest}} = user;
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

    let lastPoint;
    let balanceMonth;
    useEffect(()=>{
        const prevMonth = getPreviousMonth(month);
        let prevMonthBalance;
    
        if (balances && balances.hasOwnProperty(prevMonth)) {
            prevMonthBalance = balances[prevMonth];
        } else {
            prevMonthBalance = 0;
        }
    
        let points = ProcessData(user, year, month, prevMonthBalance);
        lastPoint = points?.length;
        balanceMonth = points && points[lastPoint-1]?.y;

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
    },[ year, month, user]);

    useEffect(()=>{
        if(balances === null){
            setBalances({
                [month]: balanceMonth
            })
        }else{
            setBalances({
                ...balances,
                [month]: balanceMonth
            })
        }
    }, [month])

    const data = React.useMemo(()=>table,[table])
    const columns = React.useMemo(()=>[
        { Header: 'Date', accessor: 'date' , disableSortBy: false},
        { Header: 'Name', accessor: 'name', disableSortBy: false},
        { Header: 'Withdraw', accessor: 'out', disableSortBy: false},
        { Header: 'Deposit', accessor: 'in' , disableSortBy: false},
        { Header: 'Balance', accessor: 'net' , disableSortBy: true},
        { Header: 'Edit', accessor: 'edit' , disableSortBy: true, 
            Cell: ({row}) => (
                <StyledEdit 
                    onClick={()=>{
                        setEdit(true)
                        setEditedRowValues(row.original)
                    }}
                />
            )
        },
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
        <div>
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
        </div>
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
        <button onClick={()=>{setForm(true)}}>Add Entry</button>
        <>
        {form && 
        <div className="hidden">
        <Form setForm = {()=>{setForm(false)}}/>
        </div>
        }
        {edit && 
        <div className="hidden">
            <Edit rowData={editedRowValues} setEdit={() => { setEdit(false); }} FetchLatestData = {FetchLatestData}/>
        </div>
        }
        </>
    </Div>
);
};
export default Historical;

const Div = styled.div`
position: relative;
padding-top: 20vh;
padding-bottom: 9vh;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
text-align: center;
padding-top: 22vh;
padding-bottom: 11vh; 
&>div{
    position: sticky;
    top: 20vh;
    right: 0;
    left: 0;
    background-color: white;
    z-index: 2;
    width: 100%;
    height: 50px;
    display:flex;
    justify-content: space-around;
    align-items:center;
    }
&>button{
    margin-top: 20px;
}
&>.hidden{
    position:fixed;
    top: 22vh;
    z-index:200;
}
`

const StyledTable = styled.table`
    width: 80%;
    border-collapse: collapse;
`;

const StyledHeader = styled.th`
    position: sticky;
    top: 25vh;
    right: 0;
    left: 0;
    z-index: 3;

    padding: 8px 12px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    text-align: center;
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

const StyledEdit = styled(({ isEditing, ...rest }) => <LuEdit3 {...rest} />)`
    font-size: 24px; 
    border: 1px solid red;
    color: blue;
    &:hover {
        color: green;
    }
`;