'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Timer, 
  BarChart3, 
  StickyNote, 
  Calendar,
  LogOut,
  User
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { data: session } = useSession();

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
        {session?.user && (
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <User size={18} />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{session.user.name}</span>
              <span className={styles.userEmail}>{session.user.email}</span>
            </div>
          </div>
        )}
        
        <button onClick={() => signOut()} className={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
