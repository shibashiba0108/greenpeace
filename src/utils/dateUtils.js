export const generateMonthData = (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const monthData = [];

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const current = new Date(date);
    const formattedDate = `${current.getFullYear()}/${String(current.getMonth() + 1).padStart(2, '0')}/${String(current.getDate()).padStart(2, '0')}`;
    monthData.push({
      date: formattedDate,
      weekday: weekdays[current.getDay()],
      type: '',  // 初期値を空文字列に設定
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
