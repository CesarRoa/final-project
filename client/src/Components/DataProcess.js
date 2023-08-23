import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Basic from "./DataProcess/Basic";

const DataProcess = ({data}) =>{

    //   const startDate = new Date(data.basicInfo.memberSince);
    //   let currentAmount = data.basicInfo.currentAmount;
    
    //   let timeline = [];
    
    //   // Process Income
    //   const income = data.basicInfo.monthlyIncome;
    //   const numDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    //   let increment = 0;
    //   switch (income.frequency) {
    //     case 1:
    //       increment = 7;
    //       break;
    //     case 2:
    //       increment = 14;
    //       break;
    //     case 4:
    //       increment = 28;
    //       break;
    //     default:
    //       increment = numDaysInMonth;
    //   }
    
    //   for (let day = new Date(income.date); day <= numDaysInMonth; day.setDate(day.getDate() + increment)) {
    //     timeline.push({ date: new Date(day), amount: income.amount, type: "income" });
    //   }
    
    //   // Process Monthly Expenses
    //   data.basicInfo.monthlyExpenses.forEach(category => {
    //     category.expenses.forEach(expense => {
    //       for (let i = 0; i < numDaysInMonth; i += expense.frequency * 30) {
    //         let expenseDate = new Date(expense.date);
    //         expenseDate.setDate(expenseDate.getDate() + i);
    
    //         if (expenseDate >= startDate && expenseDate.getDate() <= numDaysInMonth) {
    //           timeline.push({ date: new Date(expenseDate), amount: -expense.amount, type: "expense" });
    //         }
    //       }
    //     });
    //   });
    
    //   // Sort timeline by date
    //   timeline.sort((a, b) => a.date - b.date);
    
    //   // Update currentAmount based on timeline
    //   timeline.forEach(entry => {
    //     currentAmount += entry.amount;
    //     entry.balance = currentAmount;
    //   });
    
    //   return timeline;
    // };
    
    // const DataProcessor = ({ data }) => {
    //   const [processedData, setProcessedData] = useState([]);
    
    //   useEffect(() => {
    //     const result = processData(data);
    //     setProcessedData(result);
    //   }, [data]);
    
    //   return (
    //     <div>
    //       {processedData.map((entry, index) => (
    //         <div key={index}>
    //           Date: {entry.date.toISOString().split('T')[0]}, Type: {entry.type}, Amount: {entry.amount}, Balance: {entry.balance}
    //         </div>
    //       ))}
    //     </div>
    //   );
return(
  <>
  <Basic data = {data}/>
  </>
)
};

export default DataProcess;

const Div = styled.div`
/* height:300px;
width : 30%; */
border: green dashed 1px;
height: 70vh;
text-align: center;
`