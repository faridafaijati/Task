'use client';

import React from 'react';
import { Zap, Clock, Calendar, AlertCircle } from 'lucide-react';
import styles from './BusyAnalysis.module.css';

interface BusyAnalysisProps {
  data: {
    peakHours: string;
    busiestDay: string;
    efficiencyScore: number;
    recommendation: string;
  }
}

const BusyAnalysis = ({ data }: BusyAnalysisProps) => {
  return (
    <div className={`${styles.container} glass`}>
      <div className={styles.header}>
        <Zap size={20} color="var(--accent-primary)" />
        <h3>Busy Analysis</h3>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.item}>
          <Clock size={16} className={styles.icon} />
          <div className={styles.content}>
            <span className={styles.label}>Peak Activity</span>
            <span className={styles.value}>{data.peakHours}</span>
          </div>
        </div>
        
        <div className={styles.item}>
          <Calendar size={16} className={styles.icon} />
          <div className={styles.content}>
            <span className={styles.label}>Busiest Day</span>
            <span className={styles.value}>{data.busiestDay}</span>
          </div>
        </div>
      </div>

      <div className={styles.efficiencyBar}>
        <div className={styles.barHeader}>
          <span>Efficiency Score</span>
          <span>{data.efficiencyScore}%</span>
        </div>
        <div className={styles.barBg}>
          <div 
            className={styles.barFill} 
            style={{ width: `${data.efficiencyScore}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.recommendation}>
        <AlertCircle size={16} />
        <p>{data.recommendation}</p>
      </div>
    </div>
  );
};

export default BusyAnalysis;
