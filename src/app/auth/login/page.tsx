'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import styles from './auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.get('error') || '');
  const success = searchParams.get('success');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong');
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
          <h1>Welcome Back</h1>
          <p>Login to continue to TaskVibe</p>
        </div>

        {success && <div className={styles.successMessage}>{success}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
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
            />
          </div>

          <button type="submit" className={`${styles.authBtn} shimmer`} disabled={loading}>
            {loading ? <Loader2 className={styles.spin} size={20} /> : <>Login <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>Don't have an account? <Link href="/auth/signup">Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
