import React, { useState } from 'react';
import AttendanceTable from './components/AttendanceTable';
import { generateMonthData } from './utils/dateUtils';
import { calculateWorkHours } from './utils/timeUtils';
import './App.css';

const App = () => {
  const [monthData, setMonthData] = useState(generateMonthData());

  const handleChange = (index, field, value) => {
    const newMonthData = [...monthData];
    newMonthData[index][field] = value;

    if (field === 'startTime' || field === 'endTime') {
      const { startTime, endTime } = newMonthData[index];
      const calculatedHours = calculateWorkHours(startTime, endTime);
      Object.assign(newMonthData[index], calculatedHours);
    }

    setMonthData(newMonthData);
  };

  return (
    <div className="App">
      <h1>1ヶ月分の勤怠管理</h1>
      <div className="Ferunando">
        <p>氏名：コンセプション フェルナンド エバラ</p>
      <AttendanceTable month={monthData} handleChange={handleChange} />
      </div>

      <div className="saitoH">
        <p>氏名：斉藤 宏</p>
      <AttendanceTable month={monthData} handleChange={handleChange} />
      </div>

      <div className="saitoK">
        <p>氏名：斉藤 和夫</p>
      <AttendanceTable month={monthData} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default App;
