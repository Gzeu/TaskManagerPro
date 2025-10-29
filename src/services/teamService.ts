import { firebaseFirestore, COLLECTIONS } from '@config/firebase';
import { Team } from '@types/index';
import { v4 as uuidv4 } from 'uuid';

export const getUserTeams = async (userId: string): Promise<Team[]> => {
  try {
    const snapshot = await firebaseFirestore()
      .collection(COLLECTIONS.TEAMS)
      .where('members', 'array-contains', { userId })
      .get();

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate(),
    })) as Team[];
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const createTeam = async (team: Omit<Team, 'id'>): Promise<Team> => {
  try {
    const teamData = {
      ...team,
      id: uuidv4(),
      createdAt: new Date(),
    };

    await firebaseFirestore().collection(COLLECTIONS.TEAMS).doc(teamData.id).set(teamData);

    return teamData as Team;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

export const updateTeam = async (id: string, updates: Partial<Team>): Promise<Team> => {
  try {
    await firebaseFirestore().collection(COLLECTIONS.TEAMS).doc(id).update(updates);

    const doc = await firebaseFirestore().collection(COLLECTIONS.TEAMS).doc(id).get();

    return {
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data()?.createdAt?.toDate(),
    } as Team;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};
