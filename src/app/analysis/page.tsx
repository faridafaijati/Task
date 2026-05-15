'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, Activity, Zap, BarChart3 } from 'lucide-react';
import BusyAnalysis from '@/components/BusyAnalysis';
import styles from './analysis.module.css';

export default function AnalysisPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await fetch('/api/analysis');
      const result = await res.json();
      if (result && !result.error) {
        setData(result);
      } else {
        console.error('Analysis data error:', result.error);
        setData({ activityData: [], categoryData: [] });
      }
    } catch (error) {
      console.error('Fetch analysis failed:', error);
      setData({ 
        activityData: [
          { _id: '2026-05-10', completed: 5 },
          { _id: '2026-05-11', completed: 8 },
          { _id: '2026-05-12', completed: 3 },
          { _id: '2026-05-13', completed: 7 },
          { _id: '2026-05-14', completed: 10 },
        ], 
        categoryData: [
          { _id: 'Work', count: 15 },
          { _id: 'Personal', count: 10 },
          { _id: 'Health', count: 5 },
        ] 
      });
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#fbbf24', '#8b5cf6'];

  if (loading) return <div className={styles.loading}>Analyzing your data...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Activity Analysis</h1>
        <p className={styles.subtitle}>Insights into your productivity and habits.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIcon} style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Efficiency</span>
            <span className={styles.statValue}>84%</span>
          </div>
        </div>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <Activity size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tasks Done</span>
            <span className={styles.statValue}>42</span>
          </div>
        </div>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIcon} style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>
            <Zap size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Busy Streak</span>
            <span className={styles.statValue}>5 Days</span>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={`${styles.chartCard} glass`}>
          <h3><BarChart3 size={18} /> Daily Productivity</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.activityData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="_id" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${styles.chartCard} glass`}>
          <h3>Category Distribution</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="_id"
                >
                  {data.categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <BusyAnalysis 
          data={{
            peakHours: '10 AM - 2 PM',
            busiestDay: 'Tuesday',
            efficiencyScore: 78,
            recommendation: 'You are most productive in the morning. Try scheduling your deep work before lunch.'
          }}
        />
      </div>
    </div>
  );
}
