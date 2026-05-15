'use client';

import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './tasks.module.css';

interface Task {
  _id: string;
  title: string;
  description?: string;
  category: string;
  priority: string;
  status: string;
  dueDate?: string;
}

const MOCK_TASKS: Task[] = [
  { _id: '1', title: 'Welcome to TaskVibe!', category: 'Work', priority: 'high', status: 'pending', description: 'This is a sample task.' },
  { _id: '2', title: 'Try the Focus Timer', category: 'Health', priority: 'medium', status: 'pending' },
  { _id: '3', title: 'Check Activity Analysis', category: 'Education', priority: 'low', status: 'completed' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Work',
    priority: 'medium',
    description: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (Array.isArray(data)) {
        if (data.length > 0) {
          setTasks(data);
        } else {
          // Keep mock tasks if DB is empty for better first impression
          setTasks(MOCK_TASKS);
        }
        setError(null);
      } else {
        setError(data.error || 'Failed to load tasks');
        setTasks([]);
      }
    } catch (error) {
      const savedTasks = localStorage.getItem('local_tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
        setError('Database offline. Using local storage. TIP: Check your MongoDB Atlas IP Whitelist.');
      } else {
        setError('Connection issue. TIP: Ensure your IP is whitelisted in MongoDB Atlas (Network Access).');
        setTasks(MOCK_TASKS);
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempId = Math.random().toString(36).substring(7);
    const taskData = { ...newTask, _id: tempId, status: 'pending' };

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      
      if (res.ok) {
        setNewTask({ title: '', category: 'Work', priority: 'medium', description: '' });
        setShowAddModal(false);
        fetchTasks();
      } else {
        throw new Error('Database error');
      }
    } catch (error) {
      // Fallback: Add locally
      const updatedTasks = [taskData as Task, ...tasks];
      setTasks(updatedTasks);
      // Persist to localStorage for demo purposes
      localStorage.setItem('local_tasks', JSON.stringify(updatedTasks));
      
      setNewTask({ title: '', category: 'Work', priority: 'medium', description: '' });
      setShowAddModal(false);
      setError('Database unavailable. Task added to local storage instead.');
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error();
      fetchTasks();
    } catch (error) {
      // Local fallback
      const updatedTasks = tasks.map(t => t._id === id ? { ...t, status: newStatus } : t);
      setTasks(updatedTasks);
      localStorage.setItem('local_tasks', JSON.stringify(updatedTasks));
      setError('Status updated locally (Database unavailable).');
    }
  };

  const deleteTask = async (id: string) => {
    if (confirm('Delete this task?')) {
      try {
        const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error();
        fetchTasks();
      } catch (error) {
        // Local fallback
        const updatedTasks = tasks.filter(t => t._id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('local_tasks', JSON.stringify(updatedTasks));
        setError('Task deleted locally (Database unavailable).');
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>My Tasks</h1>
          <p className={styles.subtitle}>Organize your day, achieve your goals.</p>
        </div>
        <button 
          className={`${styles.addButton} shimmer`}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </header>

      {loading ? (
        <div className={styles.loading}>Loading tasks...</div>
      ) : error ? (
        <div className={styles.errorBox}>
          <p>{error}</p>
          <button onClick={fetchTasks}>Retry</button>
        </div>
      ) : (
        <div className={styles.taskList}>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div 
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${styles.taskCard} glass`}
              >
                <button 
                  className={styles.statusToggle}
                  onClick={() => toggleStatus(task._id, task.status)}
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className={styles.completedIcon} />
                  ) : (
                    <Circle className={styles.pendingIcon} />
                  )}
                </button>
                
                <div className={styles.taskContent}>
                  <h3 className={task.status === 'completed' ? styles.completedTitle : ''}>
                    {task.title}
                  </h3>
                  <div className={styles.meta}>
                    <span className={styles.categoryTag}>{task.category}</span>
                    <span className={`${styles.priorityTag} ${styles[task.priority]}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className={styles.dueDate}>
                        <Clock size={14} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <button 
                  className={styles.deleteButton}
                  onClick={() => deleteTask(task._id)}
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showAddModal && (
        <div className={styles.modalOverlay}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${styles.modalContent} glass`}
          >
            <h2>Create New Task</h2>
            <form onSubmit={addTask}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input 
                  required
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  placeholder="What needs to be done?"
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select 
                    value={newTask.category}
                    onChange={e => setNewTask({...newTask, category: e.target.value})}
                  >
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Health</option>
                    <option>Education</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className={styles.submitButton}>Create Task</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
