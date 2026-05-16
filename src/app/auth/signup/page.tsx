'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { signup } from '@/app/actions/auth';
import styles from '../login/auth.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await signup(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
      // If success, the server action will redirect
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${styles.authCard} glass`}
      >
        <div className={styles.authHeader}>
          <h1>Create Account</h1>
          <p>Join TaskVibe to start organizing</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <User size={18} />
            <input 
              name="name" 
              type="text" 
              placeholder="Full Name" 
              required 
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <Mail size={18} />
            <input 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              required 
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <Lock size={18} />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              disabled={loading}
              minLength={6}
            />
          </div>

          <button type="submit" className={`${styles.authBtn} shimmer`} disabled={loading}>
            {loading ? <Loader2 className={styles.spin} size={20} /> : <>Sign Up <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>Already have an account? <Link href="/auth/login">Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
