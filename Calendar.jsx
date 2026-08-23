import React, { useState } from "react";
import "./Calendar.css";
import { initialDeadlines } from "./initialDeadlin";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const getTasksForDay = (day) => {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return initialDeadlines.filter((task) => task.deadline === date);
  };

  const days = Array(firstDay).fill(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>‹</button>
        <h2>{monthName} {year}</h2>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>›</button>
      </div>

      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day}>{day}</div>)}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => (
          <div className="calendar-day" key={index}>
            {day && (
              <>
                <span className="day-number">{day}</span>
                <div className="day-tasks">
                  {getTasksForDay(day).map((task) => (
                    <div key={task.id} className={`task priority-${task.priority.toLowerCase()}`}>
                      {task.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="upcoming">
        <h2>Upcoming Deadlines</h2>
        {initialDeadlines.map((task) => (
          <div className="deadline-item" key={task.id}>
            <div><strong>{task.title}</strong><p>{task.deadline}</p></div>
            <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;

