import React, { useState } from 'react';
import './Calendar.css'; 

const Calendar = ({ onDateClick, events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userInput, setUserInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);

  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
    });
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    });
  };

  const handleDateClick = (date) => {
    if (onDateClick) {
        setSelectedDate(date);
        setShowEventForm(true);
    }
  };
  const handleAddEvent = () => {
    if (selectedDate && userInput.trim() !== '') {
      const newEvent = { date: selectedDate.toISOString(), description: userInput.trim() };
      events.push(newEvent);
      setUserInput('');
      setShowEventForm(false);
      setSelectedDate(null);
    }
  };

  const renderDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const event = events.find((event) => new Date(event.date).toDateString() === date.toDateString());

      days.push(
        <div
          key={i}
          className={`day ${event ? 'has-event' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
          {event && <span className="event-marker">{event.description}</span>}
        </div>
      );
    }

   for (let i = 0; i < startingDay; i++) {
      days.unshift(<div key={`empty-${i}`} className="empty-day" />);
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="navigation">
        <button onClick={prevMonth}>Previous Month</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>Next Month</button>
      </div>
      <div className="dayNames">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
      <div className="days">
        
        {renderDays()}
      </div>
      {showEventForm && (
        <div className="event-form">
          <input
            type="text"
            placeholder="Add event description"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
