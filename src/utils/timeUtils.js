const convertToDecimalHours = (hours) => {
    const decimalHours = Math.floor(hours);
    const minutes = (hours - decimalHours) * 60;
    return decimalHours + (minutes / 60);
};
  
export const calculateWorkHours = (startTime, endTime) => {
    if (!startTime || !endTime) {
        return {
            regularHours: '',
            overtimeHours: '',
            nightHours: '',
            nightOvertimeHours: '',
            legalHolidayHours: '',
            illegalHolidayHours: '',
            legalNightHours: '',
            illegalNightHours: '',
        };
    }

    const start = new Date(`2024-01-01T${startTime}:00`);
    const end = new Date(`2024-01-02T${endTime}:00`);
    const breakTime = 1; // 休憩時間は1時間

    if (end <= start) {
        end.setDate(end.getDate() + 1);
    }

    let totalHours = (end - start) / (1000 * 60 * 60) - breakTime;
    totalHours = convertToDecimalHours(totalHours);

    // 深夜時間の計算（22時〜翌5時）
    const nightStart = new Date(`2024-01-01T22:00:00`);
    const nightEnd = new Date(`2024-01-02T05:00:00`);
    let nightHours = 0;

    if (start < nightEnd && end > nightStart) {
        const nightStartTime = start < nightStart ? nightStart : start;
        const nightEndTime = end > nightEnd ? nightEnd : end;
        nightHours = (nightEndTime - nightStartTime) / (1000 * 60 * 60);
        nightHours = convertToDecimalHours(nightHours);
        if (nightStartTime < nightEnd) {
            nightHours = Math.min(nightHours, (nightEnd - nightStartTime) / (1000 * 60 * 60));
        }
        if (nightEndTime > nightStart) {
            nightHours = Math.min(nightHours, (nightEndTime - nightStart) / (1000 * 60 * 60));
        }
    }

    const regularHours = Math.min(totalHours, 8);
    const overtimeHours = totalHours > 8 ? (totalHours - 8) : 0;
    const nightOvertimeHours = nightHours > 8 ? (nightHours - 8) : 0;

    return {
        regularHours:regularHours.toFixed(2),
        overtimeHours:overtimeHours.toFixed(2),
        nightHours: nightHours.toFixed(2),
        nightOvertimeHours:nightOvertimeHours.toFixed(2),
        legalHolidayHours: '0.00',
        illegalHolidayHours: '0.00',
        legalNightHours: '0.00',
        illegalNightHours: '0.00',
    };
};