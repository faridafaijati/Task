import mongoose, { Schema, model, models } from 'mongoose';

export interface ICategory {
  name: string;
  color: string;
  icon?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  color: { type: String, default: '#6366f1' },
  icon: { type: String },
});

export const Category = models.Category || model<ICategory>('Category', CategorySchema);

export interface ITask {
  userId: string;
  title: string;
  description?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  dueDate?: Date;
  timeSpent?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  dueDate: { type: Date },
  timeSpent: { type: Number, default: 0 },
}, { timestamps: true });

export const Task = models.Task || model<ITask>('Task', TaskSchema);

export interface INote {
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export const Note = models.Note || model<INote>('Note', NoteSchema);

export { User } from './User';
