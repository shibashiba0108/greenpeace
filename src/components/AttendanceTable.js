import React from 'react';
import DayAttendance from './DayAttendance';

const AttendanceTable = ({ month, totals, handleChange }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>日付</th>
          <th>曜日</th>
          <th>区分</th>
          <th>出勤</th>
          <th>退勤</th>
          <th>所定内</th>
          <th>所定外</th>
          <th>深夜</th>
          <th>深夜残業</th>
          <th>法定内休日</th>
          <th>法定外休日</th>
          <th>法定内深夜</th>
          <th>法定外深夜</th>
        </tr>
      </thead>
      <tbody>
        {month.map((day, index) => (
          <DayAttendance key={index} index={index} day={day} handleChange={handleChange} />
        ))}
        <tr>
          <td colSpan="5"><strong>合計</strong></td>
          <td>{totals.regularHours}</td>
          <td>{totals.overtimeHours}</td>
          <td>{totals.nightHours}</td>
          <td>{totals.nightOvertimeHours}</td>
          <td>{totals.legalHolidayHours}</td>
          <td>{totals.illegalHolidayHours}</td>
          <td>{totals.legalNightHours}</td>
          <td>{totals.illegalNightHours}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AttendanceTable;
