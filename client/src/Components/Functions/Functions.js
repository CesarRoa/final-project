export const generateMonthData = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const monthData = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeekIndex = new Date(year, month - 1, day).getDay();
        const dayOfWeek = daysOfWeek[dayOfWeekIndex];

    monthData.push({
        x: `${dayOfWeek.slice(0, 2)} ${day}`,
        y: '',
    });
    }

    return monthData;
};

export const timePush = (arr, date, amount, type) =>{
    return arr.push({ date: date.toISOString().split('T')[0], amount: amount, type: type })
}

export const changeDate = (date) =>{
    const newDate =  new Date(date + "T00:00:00Z");
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    return newDate
}

export const getMonthName = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()];
}

export const formatDate =(dateString) => {
    const monthMapping = {
        'January': '01',
        'February': '02',
        'March': '03',
        'April': '04',
        'May': '05',
        'June': '06',
        'July': '07',
        'August': '08',
        'September': '09',
        'October': '10',
        'November': '11',
        'December': '12'
    };
    
    const parts = dateString.split(" ");
    const month = monthMapping[parts[0]];
    const day = '01';
    const year = parts[1]

    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
}

export const filterByMonthAndYear =(arr, month, year) =>{
    const monthMapping = {
        'January': 0,
        'February': 1,
        'March': 2,
        'April': 3,
        'May': 4,
        'June': 5,
        'July': 6,
        'August': 7,
        'September': 8,
        'October': 9,
        'November': 10,
        'December': 11
    };

    const monthIndex = monthMapping[month];

    return arr.filter(item => {
        const [y, m, d] = item.date.split('-').map(Number);
        const dateObj = new Date(Date.UTC(y, m - 1, d));
        return dateObj.getUTCMonth() === monthIndex && dateObj.getUTCFullYear() === Number(year);
    });
}

export const Basic = (data, month, year) => {
    const {data:{basicInfo, profile, historical, _id}} = data;
    const {memberSince, currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo;
    
    const test = `${month} ${year}`
    const startDate = changeDate(memberSince)
    const calculatedDate = formatDate(test)
    const targetDate = changeDate(calculatedDate)
    
    let timeline = [];
    timePush(timeline, startDate, currentAmount, "starting balance")
    
    // income per month
    
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
        timePush (timeline, day, income.amount, "income")
    }
    
    // monthly expenses

    monthlyExpenses.forEach(category =>{
        category.expenses.forEach(expense =>{
            let expenseDate = new Date(expense.date);
            while (expenseDate.getFullYear() === startDate.getFullYear()) {
                if (expenseDate >= startDate) {
                    timePush(timeline, expenseDate, -expense.amount, "expense" );
                }
                expenseDate.setDate(expenseDate.getDate() + expense.frequency * 30);
            }
        })
    })
    timeline.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    });

    // year
    yearExpenses.forEach(goal =>{
        let goalDate = new Date(goal.date);
        while (goalDate.getFullYear() === startDate.getFullYear()) {
            if(goalDate >= startDate){
                timePush(timeline, goalDate, -(Math.floor(goal.amount/12)), 'year');
            }
            goalDate.setDate(goalDate.getDate() + goal.frequency);
        }
    })
    const targetData = filterByMonthAndYear(timeline, month, year)
    return (targetData)
}