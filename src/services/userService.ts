import { firebaseFirestore, COLLECTIONS } from '@config/firebase';
import { User } from '@types/index';

export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const doc = await firebaseFirestore().collection(COLLECTIONS.USERS).doc(userId).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data?.createdAt?.toDate(),
      lastLoginAt: data?.lastLoginAt?.toDate(),
    } as User;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const createUserDocument = async (user: User): Promise<void> => {
  try {
    await firebaseFirestore().collection(COLLECTIONS.USERS).doc(user.id).set(user);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};

export const updateUserData = async (userId: string, updates: Partial<User>): Promise<void> => {
  try {
    await firebaseFirestore().collection(COLLECTIONS.USERS).doc(userId).update(updates);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
