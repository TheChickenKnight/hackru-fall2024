"use client";

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import './customCalendarStyles.css'; // Import the custom styles
import CustomToolbar from './CustomToolbar'; // Adjust the import path as necessary
import brainLogo from './brain.png'; // Adjust the import path as necessary

const localizer = momentLocalizer(moment);

const UsersPage = () => {
  const [reminders, setReminders] = useState<{ text: string; date: Date }[]>([]);
  const [newReminder, setNewReminder] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const addReminder = () => {
    if (newReminder.trim() && selectedDate) {
      setReminders([...reminders, { text: newReminder, date: selectedDate }]);
      setNewReminder('');
      setSelectedDate(null);
    }
  };

  const deleteReminder = (index: number) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  const events = reminders.map((reminder, index) => ({
    id: index,
    title: reminder.text,
    start: new Date(reminder.date),
    end: new Date(reminder.date),
  }));

  return (
    <div className="container">
      <header className="header">
        <img src={brainLogo.src} alt="Brain Logo" className="logo" />
        <h1 className="title">AlzAid</h1>
      </header>
      <h2 className="subtitle">Reminders</h2>
      <input
        type="text"
        value={newReminder}
        onChange={(e) => setNewReminder(e.target.value)}
        placeholder="Enter a reminder"
        className="input"
        style={{ color: 'black', backgroundColor: 'white' }} // Custom styles for input field
      />
      <div className="datepicker-container">
        <FaCalendarAlt
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          className="calendar-icon"
        />
        {isDatePickerOpen && (
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
            inline
          />
        )}
      </div>
      <button onClick={addReminder} className="add-button">
        Add Reminder
      </button>
      <ul className="reminder-list">
        {reminders.map((reminder, index) => (
          <li key={index} className="reminder-item">
            <div>
              <strong style={{ color: 'black' }}>{reminder.text}</strong> - {reminder.date.toLocaleString()}
            </div>
            <FaTrashAlt
              onClick={() => deleteReminder(index)}
              className="delete-icon"
            />
          </li>
        ))}
      </ul>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          components={{
            toolbar: CustomToolbar,
          }}
          defaultDate={currentDate}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#3174ad', // Customize the background color
              color: 'white', // Customize the text color
              borderRadius: '5px',
              border: 'none',
            },
          })}
        />
      </div>
    </div>
  );
};

export default UsersPage;