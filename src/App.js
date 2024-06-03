import React, { useState, useEffect } from 'react';
import AttendanceTable from './components/AttendanceTable';
import { generateMonthData } from './utils/dateUtils';
import { calculateWorkHours } from './utils/timeUtils';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storageUtils';
import './App.css';

const App = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(5);
  const localDataKey = `attendanceData-${year}-${month}`;

  const [data, setData] = useState(() => {
    const savedData = loadFromLocalStorage(localDataKey);
    if (savedData) {
      return savedData;
    }
    return {
      ferunando: generateMonthData(year, month),
      saitoH: generateMonthData(year, month),
      saitoK: generateMonthData(year, month),
    };
  });

  useEffect(() => {
    saveToLocalStorage(localDataKey, data);
  }, [data, localDataKey]);

  useEffect(() => {
    const savedData = loadFromLocalStorage(localDataKey);
    if (savedData) {
      setData(savedData);
    } else {
      setData({
        ferunando: generateMonthData(year, month),
        saitoH: generateMonthData(year, month),
        saitoK: generateMonthData(year, month),
      });
    }
  }, [year, month, localDataKey]);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setYear(newYear);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setMonth(newMonth);
  };

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
      <div>
        {/* <label>月を選択: </label> */}
        <select value={year} onChange={handleYearChange}>
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>{y}年</option>
          ))}
        </select>
        <select value={month} onChange={handleMonthChange}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}月</option>
          ))}
        </select>
      </div>
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
