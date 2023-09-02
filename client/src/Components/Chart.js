import { styled } from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip } from 'victory';
import { ProcessData, Basic, FixData, getMonthName, getPreviousMonth} from "./Functions/Functions";
import {FetchData} from "./Fetch/handlers"
import Loading from "../Loading";

const Chart = ({data}) =>{
    const {balances, setBalances} = useContext(UserContext)
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true)

    const {data:{basicInfo, ...rest}} = data; // defining raw data and extracting only basicInfo object
    const {memberSince, currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo;

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

    const username = data.data.profile.username
    const startingDate = data.data.basicInfo.memberSince;
    const startingMemberYear = startingDate.split("-")[0] //2023 as a string
    const startYear = Number(startingMemberYear); //2023 as a number
    const endYear = new Date().getFullYear() // current year
    const years = Array.from({ length: (endYear - startYear + 1) }, (_, index) => startYear + index); // 2023, 2024... until current year

    // set options only to available months since starting the app
    const currentMonthIndex = new Date().getMonth() // current month
    const startingMonthIndex = startingDate.split("-")[1] // month when user is member of app
    const activeMonths = months.slice(startingMonthIndex-1,currentMonthIndex+1) // enlisted months 

    useEffect(()=>{
        const year = startYear // 2023
        const month = getMonthName(startingDate) // Jun
        setMonth(month) // "Jun"
        setYear(year) // 2023
        setIsLoading(false) 
    },[])

    // useEffect(()=>{
    //     const saveData = async () => {
    //         const lastPoint = points?.length;
    //         let saveObject
    //         if (lastPoint > 0) {
    //             const balanceMonth = points[lastPoint-1]?.y;
    //             saveObject = {
    //                 points: saveMonthData,
    //                 balance: balanceMonth
    //             }
    //         }
    //         try{
    //             await FetchData(saveObject, username, year, month)
    //             .then(res => console.log(res))
    //         }
    //         catch(err){
    //             console.log(err)
    //         }
    //     }
    //     if (!data.data.historical?.[year]?.[month]) {
    //         (async () => {
    //             await saveData();
    //         })();
    //     }
    // },[month])

    let saveMonthData = FixData(data, year, month) //call ProcessData function with 3 params. passing whole data received from POST fetch


    const prevMonth = getPreviousMonth(month);
    let prevMonthBalance;

    if (balances && balances.hasOwnProperty(prevMonth)) {
        prevMonthBalance = balances[prevMonth];
    } else {
        prevMonthBalance = 0; // or any other default value or logic you want to apply
    }

    let points = ProcessData(data, year, month, prevMonthBalance);
    // let points = ProcessData(data, year, month, balances[getPreviousMonth(month)])

    const handleChange = (e) =>{
    let target = e.target.name
        if(target === "month"){
            setMonth(e.target.value)
        }
        if(target === "year"){
            setYear(e.target.value)
        }
    }

    const lastPoint = points?.length;
    const balanceMonth = points && points[lastPoint-1]?.y;

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

    return(
    <>
        {isLoading?
        <Loading/>:
        <>
            Chart
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
            <VictoryChart 
            theme={VictoryTheme.material}
            width={600}
            height={400}
            >
                <VictoryLine 
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={points}
                    />
                <VictoryScatter
                    style={{
                        data: { fill: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    size={5}
                    data={points}
                    x="x"
                    y="y"
                    labels={({ datum }) => ` ${datum.name} \n $${datum.amount.toLocaleString('en-US')} CAD \n Balance: $${datum.y.toLocaleString('en-US')} CAD`}
                    labelComponent={<VictoryTooltip
                        cornerRadius={10} // Adjust the corner radius (default has some rounding)
                        flyoutStyle={{ fill: "white", stroke: "lightgray" }} // Adjust the background and border of the tooltip
                        />}
                        events={[
                            {
                                target: "data",
                                eventHandlers: {
                                    onMouseOver: () => {
                                    return [
                                        {
                                            target: "data",
                                            mutation: (props) => {
                                                return { style: { ...props.style, fill: "blue", size: 7 } };  
                                            }
                                        },
                                        {
                                            target: "labels", 
                                            mutation: (props) => {
                                                return { active: true }; // this makes the tooltip visible
                                            }
                                        }
                                    ];
                                },
                                onMouseOut: () => {
                                    return [
                                        {
                                            target: "data",
                                            mutation: () => {
                                                return null;
                                            }
                                        },
                                        {
                                            target: "labels",
                                            mutation: (props) => {
                                                return { active: false }; // this hides the tooltip
                                            }
                                        }
                                    ];
                                }
                            }
                        }
                    ]}
                    />
            </VictoryChart>
        </>
        }
    </>
)
};

export default Chart;

