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


