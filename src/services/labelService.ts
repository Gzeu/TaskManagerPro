import { firebaseFirestore, COLLECTIONS } from '@config/firebase';
import { Label } from '@types/index';
import { v4 as uuidv4 } from 'uuid';

export const getUserLabels = async (userId: string): Promise<Label[]> => {
  try {
    const snapshot = await firebaseFirestore()
      .collection(COLLECTIONS.LABELS)
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as Label[];
  } catch (error) {
    console.error('Error fetching labels:', error);
    throw error;
  }
};

export const createLabel = async (label: Omit<Label, 'id'>): Promise<Label> => {
  try {
    const labelData = {
      ...label,
      id: uuidv4(),
    };

    await firebaseFirestore().collection(COLLECTIONS.LABELS).doc(labelData.id).set(labelData);

    return labelData;
  } catch (error) {
    console.error('Error creating label:', error);
    throw error;
  }
};

export const updateLabel = async (id: string, updates: Partial<Label>): Promise<Label> => {
  try {
    await firebaseFirestore().collection(COLLECTIONS.LABELS).doc(id).update(updates);

    const doc = await firebaseFirestore().collection(COLLECTIONS.LABELS).doc(id).get();

    return {
      ...doc.data(),
      id: doc.id,
    } as Label;
  } catch (error) {
    console.error('Error updating label:', error);
    throw error;
  }
};

export const deleteLabel = async (id: string): Promise<void> => {
  try {
    await firebaseFirestore().collection(COLLECTIONS.LABELS).doc(id).delete();
  } catch (error) {
    console.error('Error deleting label:', error);
    throw error;
  }
};
