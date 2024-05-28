export const generateMonthData = () => {
    const startDate = new Date(2024, 4, 1); // 2024年5月1日
    const endDate = new Date(2024, 4, 31); // 2024年5月31日
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    
    const monthData = [];
    
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const current = new Date(date);
      const formattedDate = `${current.getFullYear()}/${String(current.getMonth() + 1).padStart(2, '0')}/${String(current.getDate()).padStart(2, '0')}`;
      monthData.push({
        date: formattedDate,
        weekday: weekdays[current.getDay()],
        type: '通常',
        startTime: '',
        endTime: '',
        regularHours: '',
        overtimeHours: '',
        nightHours: '',
        nightOvertimeHours: '',
        legalHolidayHours: '',
        illegalHolidayHours: '',
        legalNightHours: '',
        illegalNightHours: '',
      });
    }
    
    return monthData;
  };
  