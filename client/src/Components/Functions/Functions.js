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

export const getPreviousMonth = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let index = months.indexOf(month);

    if (index <= 0) {
        index = 12;
    }

    return months[index - 1];
};

export const timePush = (arr, date, name, amount, tag) =>{
    return arr.push({ 
        date: date.toISOString().split('T')[0], 
        name: name, 
        amount: amount, 
        tag: tag 
    });
};

export const changeDate = (date) =>{
    const newDate =  new Date(date + "T00:00:00Z");
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    return newDate
};

export const getMonthName = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()];
};

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
};

export const Basic = (data, month, year) => {
    const {data:{basicInfo, ...rest}} = data; // defining raw data and extracting only basicInfo object
    const {memberSince, currentAmount, monthlyExpenses, monthlyIncome, yearExpenses} = basicInfo;
    const dateReq = `${month} ${year}`
    const startDate = changeDate(memberSince) // fully date format
    const calculatedDate = formatDate(dateReq) // requested date
    const targetDate = changeDate(calculatedDate) // fully requested date format

    // storing array

    let timeline = [];
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
    };
    
    for(let day = incomeStartDay; day <= lastDayOfMonth; day.setDate(day.getDate() + increment)){
        timePush (timeline, day, income.name, income.amount, income.tag)
    };
    
    // monthly expenses
    monthlyExpenses.forEach(category =>{
        category.expenses.forEach(expense =>{
            let expenseDate = new Date(expense.date);
            while (expenseDate.getFullYear() === startDate.getFullYear() && expenseDate <= lastDayOfMonth) {
                if (expenseDate >= startDate) {
                    timePush(timeline, expenseDate, expense.name, -Math.floor(expense.amount/expense.frequency), category.tag );
                }
                expenseDate.setDate(expenseDate.getDate() + expense.frequency * 30);
            };
        });
    });
    timeline.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    });

    // year expenses

    yearExpenses.forEach(goal =>{
        let goalDate = new Date(goal.date);
        while (goalDate.getFullYear() === startDate.getFullYear() && goalDate <= lastDayOfMonth) {
            if(goalDate >= startDate){
                timePush(timeline, goalDate, goal.name, -(Math.floor(goal.amount/goal.frequency)), "budget");
            };
            goalDate.setMonth(goalDate.getMonth() + 1);
        };
    });

    const targetData = filterByMonthAndYear(timeline, month, year);
    return (targetData);
};

export const FixData = (data, year, month)=>{
    return Basic(data, month, year); // call Basic, raw data is used!

};

export const ProcessData = (data, year, month, previousBalance) => {
    let checkHistory =  data.data.historical && data.data.historical[year][month] // check historical object for target year/month

        let points = null
        let timePoints = null
        if(!checkHistory){
            timePoints = Basic(data, month, year); //call Basic, raw data is used!
        }else{
            timePoints = checkHistory.data
        }
        let balance = 0;
        if (previousBalance){
            balance = previousBalance
        }
        
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
        
        timePoints && timePoints.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        points = timePoints && timePoints.map((point)=>{
            if (point.type === 'starting balance') {
                balance = point.amount;
            } else {
                balance += point.amount;
            }
            const dateObj = new Date(point.date + 'T00:00:00Z');
            const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];
            const dayOfMonth = dateObj.getUTCDate();
            const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
            
            return {
                x: `${dayOfWeek}-${dayOfMonth}${ordinalSuffix}`, 
                y: balance,
                date: point.date,
                name: point.name,
                amount: point.amount,
                tag: point.tag
            };
        })
        return points

};

export const newDateToYYYY = (date)=>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
