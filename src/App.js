import React, { useState, useEffect } from 'react';
import AttendanceTable from './components/AttendanceTable';
import { generateMonthData } from './utils/dateUtils';
import { calculateWorkHours } from './utils/timeUtils';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storageUtils';
import { calculateTotals } from './utils/calculateTotals';
import './App.css';

const App = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);

  const getLocalDataKey = (year, month) => `attendanceData-${year}-${month}`;

  const initializeData = (year, month) => {
    return {
      ferunando: generateMonthData(year, month),
      saitoH: generateMonthData(year, month),
      saitoK: generateMonthData(year, month),
    };
  };

  const loadInitialData = (year, month) => {
    const localDataKey = getLocalDataKey(year, month);
    const savedData = loadFromLocalStorage(localDataKey);
    return savedData || initializeData(year, month);
  };

  const [data, setData] = useState(() => loadInitialData(year, month));

  const calculateAndSetTotals = (data) => {
    setTotals({
      ferunando: calculateTotals(data.ferunando),
      saitoH: calculateTotals(data.saitoH),
      saitoK: calculateTotals(data.saitoK),
    });
  };

  const [totals, setTotals] = useState(() => {
    return {
      ferunando: calculateTotals(data.ferunando),
      saitoH: calculateTotals(data.saitoH),
      saitoK: calculateTotals(data.saitoK),
    };
  });

  useEffect(() => {
    const initialData = loadInitialData(year, month);
    setData(initialData);
    calculateAndSetTotals(initialData);
  }, [year, month]);

  useEffect(() => {
    const localDataKey = getLocalDataKey(year, month);
    saveToLocalStorage(localDataKey, data);
  }, [data, year, month]);

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
    calculateAndSetTotals(newData);
  };

  return (
    <div className="App">
      <div>
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
        <AttendanceTable 
          key={`ferunando-${year}-${month}`}
          month={data.ferunando} 
          totals={totals.ferunando} 
          handleChange={(index, field, value) => handleChange('ferunando', index, field, value)} 
        />
      </div>

      <div className="saitoH">
        <p>氏名：斉藤 宏</p>
        <AttendanceTable
          key={`saitoH-${year}-${month}`}
          month={data.saitoH} 
          totals={totals.saitoH} 
          handleChange={(index, field, value) => handleChange('saitoH', index, field, value)} 
        />
      </div>

      <div className="saitoK">
        <p>氏名：斉藤 和夫</p>
        <AttendanceTable 
          key={`saitoK-${year}-${month}`} 
          month={data.saitoK} 
          totals={totals.saitoK} 
          handleChange={(index, field, value) => handleChange('saitoK', index, field, value)} 
        />
      </div>
    </div>
  );
};

export default App;

