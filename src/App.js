import React, { useState, useEffect } from 'react';
import AttendanceTable from './components/AttendanceTable';
import { generateMonthData } from './utils/dateUtils';
import { calculateWorkHours } from './utils/timeUtils';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storageUtils';
import { calculateTotals } from './utils/calculateTotals';
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

  const [totals, setTotals] = useState({
    ferunando: calculateTotals(data.ferunando),
    saitoH: calculateTotals(data.saitoH),
    saitoK: calculateTotals(data.saitoK),
  });

  useEffect(() => {
    saveToLocalStorage(localDataKey, data);
  }, [data, localDataKey]);

  useEffect(() => {
    const savedData = loadFromLocalStorage(localDataKey);
    if (savedData) {
      setData(savedData);
      setTotals({
        ferunando: calculateTotals(savedData.ferunando),
        saitoH: calculateTotals(savedData.saitoH),
        saitoK: calculateTotals(savedData.saitoK),
      });
    } else {
      const newData = {
        ferunando: generateMonthData(year, month),
        saitoH: generateMonthData(year, month),
        saitoK: generateMonthData(year, month),
      };
      setData(newData);
      setTotals({
        ferunando: calculateTotals(newData.ferunando),
        saitoH: calculateTotals(newData.saitoH),
        saitoK: calculateTotals(newData.saitoK),
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

    const newData = {
      ...data,
      [user]: newUserData,
    };
    
    setData(newData);
    setTotals({
      ...totals,
      [user]: calculateTotals(newUserData),
    });
  };

  return (
    <div className="App">
      {/* <h1>1ヶ月分の勤怠管理</h1> */}
      <div>
        {/* <label>年を選択: </label> */}
        <select value={year} onChange={handleYearChange}>
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>{y}年</option>
          ))}
        </select>
        {/* <label>月を選択: </label> */}
        <select value={month} onChange={handleMonthChange}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}月</option>
          ))}
        </select>
      </div>
      <div className="Ferunando">
        <p>氏名：コンセプション フェルナンド エバラ</p>
        <AttendanceTable 
          month={data.ferunando} 
          totals={totals.ferunando} 
          handleChange={(index, field, value) => handleChange('ferunando', index, field, value)} 
        />
      </div>

      <div className="saitoH">
        <p>氏名：斉藤 宏</p>
        <AttendanceTable 
          month={data.saitoH} 
          totals={totals.saitoH} 
          handleChange={(index, field, value) => handleChange('saitoH', index, field, value)} 
        />
      </div>

      <div className="saitoK">
        <p>氏名：斉藤 和夫</p>
        <AttendanceTable 
          month={data.saitoK} 
          totals={totals.saitoK} 
          handleChange={(index, field, value) => handleChange('saitoK', index, field, value)} 
        />
      </div>
    </div>
  );
};

export default App;
