import React from 'react';

const DayAttendance = ({ day, handleChange, index }) => {
  return (
    <tr>
      <td data-label="日付">{day.date}</td>
      <td data-label="曜日">{day.weekday}</td>
      <td data-label="区分">
      <select value={day.type} onChange={(e) => handleChange(index, 'type', e.target.value)}>
          <option value=""> ー </option>
          <option value="通常">通常</option>
          <option value="休出">休出</option>
        </select>
      </td>
      <td data-label="出勤時間"><input type="time" value={day.startTime} onChange={(e) => handleChange(index, 'startTime', e.target.value)} /></td>
      <td data-label="退勤時間"><input type="time" value={day.endTime} onChange={(e) => handleChange(index, 'endTime', e.target.value)} /></td>
      <td data-label="所定内時間"><input type="text" value={day.regularHours} onChange={(e) => handleChange(index, 'regularHours', e.target.value)} /></td>
      <td data-label="所定外時間"><input type="text" value={day.overtimeHours} onChange={(e) => handleChange(index, 'overtimeHours', e.target.value)} /></td>
      <td data-label="深夜時間"><input type="text" value={day.nightHours} onChange={(e) => handleChange(index, 'nightHours', e.target.value)} /></td>
      <td data-label="深夜残業時間"><input type="text" value={day.nightOvertimeHours} onChange={(e) => handleChange(index, 'nightOvertimeHours', e.target.value)} /></td>
      <td data-label="法定内休日時間"><input type="text" value={day.legalHolidayHours} onChange={(e) => handleChange(index, 'legalHolidayHours', e.target.value)} /></td>
      <td data-label="法定外休日時間"><input type="text" value={day.illegalHolidayHours} onChange={(e) => handleChange(index, 'illegalHolidayHours', e.target.value)} /></td>
      <td data-label="法定内深夜時間"><input type="text" value={day.legalNightHours} onChange={(e) => handleChange(index, 'legalNightHours', e.target.value)} /></td>
      <td data-label="法定外深夜時間"><input type="text" value={day.illegalNightHours} onChange={(e) => handleChange(index, 'illegalNightHours', e.target.value)} /></td>
    </tr>
  );
};

export default DayAttendance;
