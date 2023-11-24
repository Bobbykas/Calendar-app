import React from 'react';
import Calendar from './component/Calendar';

const App = () => {
  const handleDateClick = (date) => {
    console.log('Clicked date:', date);
 };

  const events = [
    { date: '2023-11-15', description: 'Meeting' },
    { date: '2023-11-20', description: 'Lunch' },
  ];

  return (
    <div className="App">
      <h1>My Calendar App</h1>
      <Calendar onDateClick={handleDateClick} events={events} />
    </div>
  );
};

export default App;
