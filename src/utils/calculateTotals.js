export const calculateTotals = (monthData) => {
  const totals = {
    regularHours: 0,
    overtimeHours: 0,
    nightHours: 0,
    nightOvertimeHours: 0,
    legalHolidayHours: 0,
    illegalHolidayHours: 0,
    legalNightHours: 0,
    illegalNightHours: 0,
  };

  monthData.forEach((day) => {
    totals.regularHours += parseFloat(day.regularHours) || 0;
    totals.overtimeHours += parseFloat(day.overtimeHours) || 0;
    totals.nightHours += parseFloat(day.nightHours) || 0;
    totals.nightOvertimeHours += parseFloat(day.nightOvertimeHours) || 0;
    totals.legalHolidayHours += parseFloat(day.legalHolidayHours) || 0;
    totals.illegalHolidayHours += parseFloat(day.illegalHolidayHours) || 0;
    totals.legalNightHours += parseFloat(day.legalNightHours) || 0;
    totals.illegalNightHours += parseFloat(day.illegalNightHours) || 0;
  });

  // 小数点以下2桁に固定
  for (let key in totals) {
    totals[key] = totals[key].toFixed(2);
  }

  return totals;
};
