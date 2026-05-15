'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './schedule.module.css';

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch tasks for the current month
    const mockTasks = [
      { id: 1, title: 'Project Review', time: '10:00 AM', day: 15 },
      { id: 2, title: 'Gym Session', time: '05:00 PM', day: 15 },
      { id: 3, title: 'Design Sprint', time: '09:00 AM', day: 18 },
    ];
    setTasks(mockTasks);
  }, [currentDate]);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const days = [];
  const totalDays = daysInMonth(year, currentDate.getMonth());
  const startDay = firstDayOfMonth(year, currentDate.getMonth());

  // Padding for start of month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`pad-${i}`} className={styles.emptyDay}></div>);
  }

  // Actual days
  for (let d = 1; d <= totalDays; d++) {
    const dayTasks = tasks.filter(t => t.day === d);
    const isToday = d === new Date().getDate() && 
                    currentDate.getMonth() === new Date().getMonth() && 
                    currentDate.getFullYear() === new Date().getFullYear();

    days.push(
      <div key={d} className={`${styles.day} ${isToday ? styles.today : ''}`}>
        <span className={styles.dayNumber}>{d}</span>
        <div className={styles.dayTasks}>
          {dayTasks.map(task => (
            <div key={task.id} className={styles.miniTask}>
              {task.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Schedule</h1>
          <p className={styles.subtitle}>Plan your weeks and months ahead.</p>
        </div>
        <div className={styles.controls}>
          <button onClick={prevMonth} className={styles.navBtn}><ChevronLeft size={20} /></button>
          <span className={styles.monthLabel}>{monthName} {year}</span>
          <button onClick={nextMonth} className={styles.navBtn}><ChevronRight size={20} /></button>
        </div>
      </header>

      <div className={`${styles.calendarGrid} glass`}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.weekdayLabel}>{day}</div>
        ))}
        {days}
      </div>

      <div className={styles.upcomingSection}>
        <h2>Today's Timeline</h2>
        <div className={styles.timeline}>
          {tasks.filter(t => t.day === 15).map(task => (
            <div key={task.id} className={`${styles.timelineItem} glass`}>
              <div className={styles.timeLabel}>
                <Clock size={16} /> {task.time}
              </div>
              <div className={styles.taskInfo}>
                <h4>{task.title}</h4>
              </div>
            </div>
          ))}
          <button className={styles.addEventBtn}>
            <Plus size={18} /> Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
