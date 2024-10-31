import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Task } from '@/types';

export async function createTask(userId: string, taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    if (!db) throw new Error('Database not initialized');
    const tasksRef = collection(db, 'tasks');
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateTask(taskId: string, taskData: Partial<Task>) {
  try {
    if (!db) throw new Error('Database not initialized');
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      ...taskData,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteTask(taskId: string) {
  try {
    if (!db) throw new Error('Database not initialized');
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getTasks(userId: string): Promise<Task[]> {
  try {
    if (!db) throw new Error('Database not initialized');
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}