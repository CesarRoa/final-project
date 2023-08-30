import React from 'react';
import {timePush, changeDate, getMonthName, formatDate, filterByMonthAndYear} from '../Functions/Functions'

const Basic = ({data}) => {
    const {data:{basicInfo, profile, historical, _id}} = data;
    const {memberSince, currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo;
    
    // storing array

    let timeline = [];

    // add balance as starting point

    const test = "June 2023"
    const startDate = changeDate(memberSince)
    const calculatedDate = formatDate(test)
    const targetDate = changeDate(calculatedDate)
    const month = getMonthName(calculatedDate);
    const year = calculatedDate.split("-")[0]    

    timePush(timeline, startDate, "Balance", currentAmount, "balance")

    // add income per month

    const income = monthlyIncome;
    const incomeStartDay = changeDate(income.date)
    const lastDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

    let increment = 0;
    switch (income.frequency) {
    case 1:
        increment = 7;
        break;
    case 2:
        increment = 14;
        break;
    case 4:
        increment = 28;
        break;
    default:
        increment = targetDate;
    }

    for(let day = incomeStartDay; day <= lastDayOfMonth; day.setDate(day.getDate() + increment)){
        timePush (timeline, day, income.name, income.amount, income.tag)
    }
    
    // monthly expenses

    monthlyExpenses.forEach(category =>{
        category.expenses.forEach(expense =>{
            let expenseDate = new Date(expense.date);
            while (expenseDate.getFullYear() === startDate.getFullYear()) {
                if (expenseDate >= startDate) {
                    timePush(timeline, expenseDate, expense.name, -Math.floor(expense.amount/expense.frequency), category.tag );
                }
                expenseDate.setDate(expenseDate.getDate() + expense.frequency * 30);
            }
        })
    })
    
    // year expenses

    yearExpenses.forEach(goal =>{
        let goalDate = new Date(goal.date);
        while (goalDate.getFullYear() === startDate.getFullYear()) {
            if(goalDate >= startDate){
                timePush(timeline, goalDate, goal.name, -(Math.floor(goal.amount/goal.frequency)), "budget");
            }
            goalDate.setMonth(goalDate.getMonth() + 1);
        }
    })


    timeline.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    });

    const targetData = filterByMonthAndYear(timeline, month, year)
    console.log(targetData)
    return (
        <div>Basic
        </div>
    )
}

export default Basic