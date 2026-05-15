'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './timer.module.css';

const MOCK_TASKS = [
  { _id: '1', title: 'Welcome Task' },
  { _id: '2', title: 'Focus Session' },
];

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [tasks, setTasks] = useState<any[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks?status=pending');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setTasks(data);
      } else {
        setTasks(MOCK_TASKS);
      }
    } catch (e) {
      setTasks(MOCK_TASKS);
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      alert(mode === 'work' ? 'Time for a break!' : 'Back to work!');
      toggleMode();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const toggleMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'work' ? 25 * 60 : 5 * 60)) * 100;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Focus Timer</h1>
        <p className={styles.subtitle}>Maximize productivity with Pomodoro technique.</p>
      </header>

      <div className={`${styles.timerCard} glass`}>
        <div className={styles.modeTabs}>
          <button 
            className={mode === 'work' ? styles.activeTab : ''} 
            onClick={() => mode !== 'work' && toggleMode()}
          >
            <Brain size={18} /> Work
          </button>
          <button 
            className={mode === 'break' ? styles.activeTab : ''} 
            onClick={() => mode !== 'break' && toggleMode()}
          >
            <Coffee size={18} /> Break
          </button>
        </div>

        <div className={styles.taskPicker}>
          <label>Focusing on:</label>
          <select 
            value={selectedTask} 
            onChange={(e) => setSelectedTask(e.target.value)}
            className="glass"
          >
            <option value="">No specific task</option>
            {tasks.map(task => (
              <option key={task._id} value={task._id}>{task.title}</option>
            ))}
          </select>
        </div>

        <div className={styles.timerDisplay}>
          <svg className={styles.progressCircle} viewBox="0 0 100 100">
            <circle className={styles.progressBg} cx="50" cy="50" r="45" />
            <motion.circle 
              className={styles.progressFill} 
              cx="50" cy="50" r="45"
              strokeDasharray="283"
              animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
          <div className={styles.timeText}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={resetTimer} className={styles.controlBtn}>
            <RotateCcw size={24} />
          </button>
          <button onClick={toggleTimer} className={`${styles.mainControlBtn} shimmer`}>
            {isActive ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" style={{ marginLeft: '4px' }} />}
          </button>
          <div style={{ width: '48px' }}></div> {/* Spacer */}
        </div>
      </div>
    </div>
  );
}
