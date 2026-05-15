'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar as CalendarIcon, 
  ArrowRight,
  Plus,
  WifiOff,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

export default function Home() {
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    today: 0
  });
  const [dbStatus, setDbStatus] = useState<any>(null);

  useEffect(() => {
    checkStatus();
    // Mocking stats for now
    setStats({
      pending: 12,
      completed: 28,
      today: 5
    });
  }, []);

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setDbStatus(data);
    } catch (e) {
      setDbStatus({ connected: false, error: 'Failed to reach API' });
    }
  };

  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <span className={styles.date}>{today}</span>
          <h1>Welcome back, <span className={styles.highlight}>Viber</span></h1>
        </div>
        <div className={styles.actions}>
          <Link href="/tasks" className={`${styles.btnPrimary} shimmer`}>
            <Plus size={18} /> New Task
          </Link>
        </div>
      </header>

      <section className={styles.motivation}>
        <p>"The secret of getting ahead is getting started."</p>
        <span>— Mark Twain</span>
      </section>

      <AnimatePresence>
        {dbStatus && !dbStatus.connected && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`${styles.setupGuide} glass`}
          >
            <div className={styles.guideHeader}>
              <WifiOff color="var(--accent-tertiary)" size={24} />
              <div>
                <h3>Database Connection Required</h3>
                <p>Your MongoDB Atlas cluster is blocking the connection.</p>
              </div>
            </div>
            
            <div className={styles.guideSteps}>
              <div className={styles.step}>
                <span className={styles.stepNum}>1</span>
                <p>Go to <strong>Network Access</strong> in MongoDB Atlas.</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>2</span>
                <p>Add this IP address to the whitelist: <code>{dbStatus.ip || '182.8.249.252'}</code></p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>3</span>
                <p>Wait 1 minute and then refresh this page.</p>
              </div>
            </div>

            <div className={styles.guideActions}>
              <a href="https://cloud.mongodb.com" target="_blank" className={styles.atlasLink}>
                Open Atlas <ExternalLink size={14} />
              </a>
              <button onClick={checkStatus} className={styles.retryBtn}>Check Again</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className={styles.grid}>
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <CheckCircle2 size={24} color="var(--accent-secondary)" />
            <h3>Today's Overview</h3>
          </div>
          <div className={styles.overviewStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.pending}</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.completed}</span>
              <span className={styles.statLabel}>Completed</span>
            </div>
          </div>
        </div>

        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Clock size={24} color="var(--accent-primary)" />
            <h3>Focus Session</h3>
          </div>
          <p className={styles.cardText}>You've spent 4.5 hours focusing today. Great job!</p>
          <Link href="/timer" className={styles.cardLink}>
            Start Timer <ArrowRight size={16} />
          </Link>
        </div>

        <div className={`${styles.card} glass ${styles.span2}`}>
          <div className={styles.cardHeader}>
            <CalendarIcon size={24} color="var(--accent-tertiary)" />
            <h3>Upcoming Deadlines</h3>
          </div>
          <div className={styles.deadlineList}>
            {[
              { title: 'Project Proposal', date: 'Tomorrow', priority: 'high' },
              { title: 'Team Meeting', date: 'May 17', priority: 'medium' },
              { title: 'Gym Session', date: 'May 18', priority: 'low' },
            ].map((item, i) => (
              <div key={i} className={styles.deadlineItem}>
                <div className={`${styles.priorityDot} ${styles[item.priority]}`}></div>
                <span className={styles.deadlineTitle}>{item.title}</span>
                <span className={styles.deadlineDate}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.recentActivity}>
        <h2>Recent Insights</h2>
        <div className={styles.insightGrid}>
          <div className={`${styles.insightCard} glass`}>
            <h4>Productivity Peak</h4>
            <p>You are most active between 10:00 AM and 12:00 PM.</p>
          </div>
          <div className={`${styles.insightCard} glass`}>
            <h4>Focus Score</h4>
            <p>Your focus score is up 12% from last week.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
