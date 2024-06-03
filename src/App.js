import React, { useState } from 'react';
import AttendanceTable from './components/AttendanceTable';
import { generateMonthData } from './utils/dateUtils';
import { calculateWorkHours } from './utils/timeUtils';
import './App.css';

const App = () => {
  const initialData = {
    ferunando: generateMonthData(),
    saitoH: generateMonthData(),
    saitoK: generateMonthData(),
  };

  const [data, setData] = useState(initialData);

  const handleChange = (user, index, field, value) => {
    const newUserData = [...data[user]];
    newUserData[index][field] = value;

    if (field === 'startTime' || field === 'endTime') {
      const { startTime, endTime } = newUserData[index];
      const calculatedHours = calculateWorkHours(startTime, endTime);
      Object.assign(newUserData[index], calculatedHours);
    }

    setData({
      ...data,
      [user]: newUserData,
    });
  };

  return (
    <div className="App">
      <h1>1ヶ月分の勤怠管理</h1>
      <div className="Ferunando">
        <p>氏名：コンセプション フェルナンド エバラ</p>
        <AttendanceTable month={data.ferunando} handleChange={(index, field, value) => handleChange('ferunando', index, field, value)} />
      </div>

      <div className="saitoH">
        <p>氏名：斉藤 宏</p>
        <AttendanceTable month={data.saitoH} handleChange={(index, field, value) => handleChange('saitoH', index, field, value)} />
      </div>

      <div className="saitoK">
        <p>氏名：斉藤 和夫</p>
        <AttendanceTable month={data.saitoK} handleChange={(index, field, value) => handleChange('saitoK', index, field, value)} />
      </div>
    </div>
  );
};

export default App;
