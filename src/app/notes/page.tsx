'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, StickyNote } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './notes.module.css';

interface Note {
  _id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const MOCK_NOTES: Note[] = [
  { _id: '1', title: 'Daily Goals', content: '1. Meditate\n2. Code 2 hours\n3. Read a book', updatedAt: new Date().toISOString() },
  { _id: '2', title: 'Shopping List', content: 'Apples, Milk, Bread', updatedAt: new Date().toISOString() },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      if (Array.isArray(data)) {
        if (data.length > 0) {
          setNotes(data);
        } else {
          setNotes(MOCK_NOTES);
        }
      } else {
        console.error('Expected array but got:', data);
        setNotes([]);
      }
    } catch (error) {
      console.error('Fetch notes failed:', error);
      setNotes(MOCK_NOTES);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    });

    if (res.ok) {
      setNewNote({ title: '', content: '' });
      fetchNotes();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Notes</h1>
        <p className={styles.subtitle}>Capture your thoughts and ideas.</p>
      </header>

      <div className={styles.content}>
        <div className={`${styles.editor} glass`}>
          <h3>New Note</h3>
          <form onSubmit={addNote}>
            <input 
              placeholder="Note Title"
              value={newNote.title}
              onChange={e => setNewNote({...newNote, title: e.target.value})}
            />
            <textarea 
              placeholder="Start typing..."
              value={newNote.content}
              onChange={e => setNewNote({...newNote, content: e.target.value})}
            />
            <button type="submit" className="shimmer">
              <Plus size={18} /> Save Note
            </button>
          </form>
        </div>

        <div className={styles.notesGrid}>
          {notes.map((note) => (
            <motion.div 
              key={note._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${styles.noteCard} glass`}
            >
              <div className={styles.noteHeader}>
                <StickyNote size={16} color="var(--accent-primary)" />
                <h4>{note.title}</h4>
              </div>
              <p>{note.content}</p>
              <div className={styles.noteFooter}>
                <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
