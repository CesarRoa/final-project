import { styled } from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip } from 'victory';
import { ProcessData, getMonthName} from "./Functions/Functions";
import {FetchData} from "./Fetch/handlers"
import Loading from "../Loading";

const Chart = ({data}) =>{
    const {update, setUpdate} = useContext(UserContext)
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true)

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
        const saveData = async () => {
            const lastPoint = points.length;
            let saveObject
            if (lastPoint > 0) {
                const balanceMonth = points[lastPoint-1].y;
                saveObject = {
                    points: points,
                    balance: balanceMonth
                }
            }
            try{
                await FetchData(saveObject, username, year, month)
                .then(res => console.log(res))
            }
            catch(err){
                console.log(err)
            }
        }
        if (!data.data.historical?.[year]?.[month]) {
            (async () => {
                await saveData();
            })();
        }
    },[month])

    let points = ProcessData(data, year, month)

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

