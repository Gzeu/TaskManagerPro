import { firebaseFirestore, COLLECTIONS } from '@config/firebase';
import { Task } from '@types/index';
import { v4 as uuidv4 } from 'uuid';

export const getUserTasks = async (userId: string): Promise<Task[]> => {
  try {
    const snapshot = await firebaseFirestore()
      .collection(COLLECTIONS.TASKS)
      .where('createdBy', '==', userId)
      .orderBy('order', 'asc')
      .get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      dueDate: doc.data().dueDate?.toDate(),
      reminderDate: doc.data().reminderDate?.toDate(),
      completedAt: doc.data().completedAt?.toDate(),
    })) as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const taskData = {
      ...task,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await firebaseFirestore().collection(COLLECTIONS.TASKS).doc(taskData.id).set(taskData);

    return taskData as Task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  try {
    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };

    await firebaseFirestore().collection(COLLECTIONS.TASKS).doc(id).update(updateData);

    const doc = await firebaseFirestore().collection(COLLECTIONS.TASKS).doc(id).get();

    return {
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data()?.createdAt?.toDate(),
      updatedAt: doc.data()?.updatedAt?.toDate(),
      dueDate: doc.data()?.dueDate?.toDate(),
      reminderDate: doc.data()?.reminderDate?.toDate(),
      completedAt: doc.data()?.completedAt?.toDate(),
    } as Task;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await firebaseFirestore().collection(COLLECTIONS.TASKS).doc(id).delete();
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const bulkUpdateTasks = async (
  updates: Array<{ id: string; updates: Partial<Task> }>,
): Promise<Task[]> => {
  try {
    const batch = firebaseFirestore().batch();

    updates.forEach(({ id, updates }) => {
      const ref = firebaseFirestore().collection(COLLECTIONS.TASKS).doc(id);
      batch.update(ref, { ...updates, updatedAt: new Date() });
    });

    await batch.commit();

    const updatedTasks = await Promise.all(
      updates.map(async ({ id }) => {
        const doc = await firebaseFirestore().collection(COLLECTIONS.TASKS).doc(id).get();
        return {
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data()?.createdAt?.toDate(),
          updatedAt: doc.data()?.updatedAt?.toDate(),
          dueDate: doc.data()?.dueDate?.toDate(),
          reminderDate: doc.data()?.reminderDate?.toDate(),
          completedAt: doc.data()?.completedAt?.toDate(),
        } as Task;
      }),
    );

    return updatedTasks;
  } catch (error) {
    console.error('Error bulk updating tasks:', error);
    throw error;
  }
};

export const subscribeToTasks = (
  userId: string,
  callback: (tasks: Task[]) => void,
): (() => void) => {
  return firebaseFirestore()
    .collection(COLLECTIONS.TASKS)
    .where('createdBy', '==', userId)
    .orderBy('order', 'asc')
    .onSnapshot(snapshot => {
      const tasks = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        dueDate: doc.data().dueDate?.toDate(),
        reminderDate: doc.data().reminderDate?.toDate(),
        completedAt: doc.data().completedAt?.toDate(),
      })) as Task[];
      callback(tasks);
    });
};
