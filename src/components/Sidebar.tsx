'use strict';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Timer, 
  BarChart3, 
  StickyNote, 
  Calendar,
  Settings
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/' },
    { icon: <CheckSquare size={20} />, label: 'Tasks', href: '/tasks' },
    { icon: <Timer size={20} />, label: 'Timer', href: '/timer' },
    { icon: <BarChart3 size={20} />, label: 'Analysis', href: '/analysis' },
    { icon: <StickyNote size={20} />, label: 'Notes', href: '/notes' },
    { icon: <Calendar size={20} />, label: 'Schedule', href: '/schedule' },
  ];

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>TV</div>
        <span className={styles.logoText}>TaskVibe</span>
      </div>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.navItem}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <Link href="/settings" className={styles.navItem}>
          <span className={styles.icon}><Settings size={20} /></span>
          <span className={styles.label}>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
