import { styled } from "styled-components";
import {VictoryBar, VictoryChart, VictoryLine, VictoryTheme} from 'victory';
import { generateMonthData } from "./Functions/Functions";
const Chart = ({historical, basicInfo}) =>{
    
    const data = [
        { x: '1', y: 10 },
        { x: '2', y: 20 },
        { x: '3', y: 15 },
        // ... add more data points
    ];
    return(
    <>
        Chart
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={data}
                />
                <VictoryBar data={data} x="x" y="y" />
            </VictoryChart>
    </>
)
};

export default Chart;

