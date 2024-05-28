import React from 'react';

const DayAttendance = ({ day, handleChange, index }) => {
  return (
    <tr>
      <td>{day.date}</td>
      <td>{day.weekday}</td>
      <td>
      <select value={day.type} onChange={(e) => handleChange(index, 'type', e.target.value)}>
          <option value="通常">通常</option>
          <option value="休出">休出</option>
        </select>
      </td>
      <td><input type="time" value={day.startTime} onChange={(e) => handleChange(index, 'startTime', e.target.value)} /></td>
      <td><input type="time" value={day.endTime} onChange={(e) => handleChange(index, 'endTime', e.target.value)} /></td>
      <td><input type="text" value={day.regularHours} onChange={(e) => handleChange(index, 'regularHours', e.target.value)} /></td>
      <td><input type="text" value={day.overtimeHours} onChange={(e) => handleChange(index, 'overtimeHours', e.target.value)} /></td>
      <td><input type="text" value={day.nightHours} onChange={(e) => handleChange(index, 'nightHours', e.target.value)} /></td>
      <td><input type="text" value={day.nightOvertimeHours} onChange={(e) => handleChange(index, 'nightOvertimeHours', e.target.value)} /></td>
      <td><input type="text" value={day.legalHolidayHours} onChange={(e) => handleChange(index, 'legalHolidayHours', e.target.value)} /></td>
      <td><input type="text" value={day.illegalHolidayHours} onChange={(e) => handleChange(index, 'illegalHolidayHours', e.target.value)} /></td>
      <td><input type="text" value={day.legalNightHours} onChange={(e) => handleChange(index, 'legalNightHours', e.target.value)} /></td>
      <td><input type="text" value={day.illegalNightHours} onChange={(e) => handleChange(index, 'illegalNightHours', e.target.value)} /></td>
    </tr>
  );
};

export default DayAttendance;
