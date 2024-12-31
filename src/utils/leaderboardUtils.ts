import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { LeaderboardEntry } from '../types/leaderboard';

export const buildMatchLeaderboard = async (matchId: string): Promise<LeaderboardEntry[]> => {
  try {
    const predictionsRef = collection(db, 'predictions');
    const predictionsQuery = query(predictionsRef, where('matchId', '==', matchId));
    const predictionsSnapshot = await getDocs(predictionsQuery);
    
    const entries = await Promise.all(
      predictionsSnapshot.docs.map(async (predDoc) => {
        const prediction = predDoc.data();
        let correctCount = 0;

        // Calculate correct predictions
        for (const playerId of prediction.selectedPlayers) {
          const playerDoc = await getDoc(doc(db, 'players', playerId));
          if (!playerDoc.exists()) continue;

          const player = playerDoc.data();
          const target = player.matchTargets?.[matchId];
          if (target?.actualPoints !== undefined && target.actualPoints >= target.target) {
            correctCount++;
          }
        }

        return {
          userId: prediction.userId,
          userEmail: prediction.userEmail,
          displayName: prediction.userEmail.split('@')[0],
          correctPredictions: correctCount,
          totalPredictions: 5,
          accuracy: (correctCount / 5) * 100
        } as LeaderboardEntry;
      })
    );

    return entries
      .sort((a, b) => b.correctPredictions - a.correctPredictions || b.accuracy - a.accuracy)
      .slice(0, 10);
  } catch (error) {
    console.error('Error building match leaderboard:', error);
    return [];
  }
};

export const buildAllTimeLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    const snapshot = await getDocs(leaderboardRef);
    
    if (snapshot.empty) {
      return [];
    }

    const entries = snapshot.docs.map(doc => ({
      ...doc.data(),
      userId: doc.id
    })) as LeaderboardEntry[];

    return entries
      .sort((a, b) => b.correctPredictions - a.correctPredictions || b.accuracy - a.accuracy)
      .slice(0, 10);
  } catch (error) {
    console.error('Error building all-time leaderboard:', error);
    return [];
  }
};