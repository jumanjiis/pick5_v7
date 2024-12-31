import { collection, doc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { LeaderboardEntry } from '../types/leaderboard';

export const updateAllTimeLeaderboard = async (matchId: string) => {
  try {
    // 1. Get all predictions for the completed match
    const predictionsRef = collection(db, 'predictions');
    const matchPredictions = await getDocs(
      query(predictionsRef, where('matchId', '==', matchId))
    );

    // 2. Calculate correct predictions for each user
    const userResults = new Map<string, {
      email: string;
      displayName: string;
      correct: number;
      total: number;
    }>();

    await Promise.all(
      matchPredictions.docs.map(async (predDoc) => {
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

        // Update user stats
        const existing = userResults.get(prediction.userId) || {
          email: prediction.userEmail,
          displayName: prediction.userEmail.split('@')[0],
          correct: 0,
          total: 0
        };

        userResults.set(prediction.userId, {
          ...existing,
          correct: existing.correct + correctCount,
          total: existing.total + 5
        });
      })
    );

    // 3. Get existing all-time stats
    for (const [userId, matchStats] of userResults.entries()) {
      const userLeaderboardRef = doc(db, 'leaderboard', userId);
      const existingDoc = await getDoc(userLeaderboardRef);
      const existing = existingDoc.exists() ? existingDoc.data() : {
        correctPredictions: 0,
        totalPredictions: 0
      };

      const updated: LeaderboardEntry = {
        userId,
        userEmail: matchStats.email,
        displayName: matchStats.displayName,
        correctPredictions: existing.correctPredictions + matchStats.correct,
        totalPredictions: existing.totalPredictions + matchStats.total,
        accuracy: 0
      };

      // Calculate accuracy
      updated.accuracy = (updated.correctPredictions / updated.totalPredictions) * 100;

      // Save updated stats
      await setDoc(userLeaderboardRef, updated);
    }

    console.log('All-time leaderboard updated successfully');
  } catch (error) {
    console.error('Error updating all-time leaderboard:', error);
    throw error;
  }
};