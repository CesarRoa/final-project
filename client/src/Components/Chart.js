import { styled } from "styled-components";
import { useState, useEffect } from "react";
import {VictoryChart, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip} from 'victory';
import { Basic, getMonthName} from "./Functions/Functions";
const Chart = ({data}) =>{
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("")
    
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

    const startingDate = data.data.basicInfo.memberSince;
    const startingMemberYear = startingDate.split("-")[0]
    const startYear = Number(startingMemberYear);
    const endYear = startYear+2;
    const years = Array.from({ length: (endYear - startYear + 1) }, (_, index) => startYear + index);

    
    useEffect(()=>{
        const year = startingDate.split("-")[0]
        const month = getMonthName(startingDate)
        setMonth(month)
        setYear(year)
    },[])

    let timePoints = Basic(data, month, year);

    console.log(timePoints)
    let balance = 0;
    
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const getOrdinalSuffix = (num) => {
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
        }
    };

    timePoints.sort((a, b) => new Date(a.date) - new Date(b.date));

    let points = timePoints.map((point)=>{
        if (point.type === 'starting balance') {
            balance = point.amount;
        } else {
            balance += point.amount;
        }
        const dateObj = new Date(point.date + 'T00:00:00Z');
        const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];
        const dayOfMonth = dateObj.getUTCDate();
        const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

        return {x: `${dayOfMonth}${ordinalSuffix}-${dayOfWeek}`, y: balance};
    })

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
        Chart
        <select
        value = {month}
        name = "month"
        onChange = {handleChange}
        >
            {months.map(month =>(
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
                labels={({ datum }) => `DATE: ${datum.x}, CAD: ${datum.y}`}
                labelComponent={<VictoryTooltip
                    cornerRadius={0} // Adjust the corner radius (default has some rounding)
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
)
};

export default Chart;

