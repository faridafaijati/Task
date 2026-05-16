import mongoose from 'mongoose';
import { connectDB } from './src/lib/mongodb';
import { Task, Note } from './src/models';

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Task.deleteMany({});
    await Note.deleteMany({});

    const categories = ['Work', 'Personal', 'Health', 'Education'];
    const priorities = ['low', 'medium', 'high'] as const;

    // Create tasks for the last 10 days
    const tasks = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 10));
      
      tasks.push({
        title: `Task ${i + 1}`,
        description: `Description for task ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: Math.random() > 0.3 ? 'completed' : 'pending',
        createdAt: date,
        updatedAt: date,
        dueDate: new Date(date.getTime() + 86400000 * 2) // 2 days after creation
      });
    }

    await Task.insertMany(tasks);

    // Create some notes
    const notes = [
      { title: 'Project Ideas', content: '1. TaskVibe refinements\n2. AI integration\n3. Mobile app' },
      { title: 'Shopping List', content: 'Milk, Eggs, Bread, Coffee beans' },
      { title: 'Meeting Notes', content: 'Discussed timeline and budget. Next meeting on Monday.' }
    ];

    await Note.insertMany(notes);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
