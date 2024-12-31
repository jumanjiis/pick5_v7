import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format } from 'date-fns';

export const calculateAnalytics = async (startDate: Date, endDate: Date) => {
  try {
    // Get users
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const totalUsers = usersSnapshot.size;

    // Get predictions within date range
    const predictionsRef = collection(db, 'predictions');
    const predictionsQuery = query(
      predictionsRef,
      where('createdAt', '>=', startDate.toISOString()),
      where('createdAt', '<=', endDate.toISOString())
    );
    const predictionsSnapshot = await getDocs(predictionsQuery);
    const predictions = predictionsSnapshot.docs.map(doc => doc.data());

    // Calculate active users (users who made predictions in the date range)
    const activeUsers = new Set(predictions.map(p => p.userId)).size;

    // Calculate average accuracy
    let totalCorrect = 0;
    let totalPredictions = 0;
    const predictionDistribution = Array(6).fill(0); // 0-5 correct predictions

    predictions.forEach(prediction => {
      const correct = prediction.correctPredictions || 0;
      totalCorrect += correct;
      totalPredictions += 5; // Each prediction has 5 picks
      predictionDistribution[correct]++;
    });

    const avgAccuracy = totalPredictions > 0 ? (totalCorrect / totalPredictions) * 100 : 0;

    // Calculate daily user activity
    const userActivity = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayStart = new Date(currentDate);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);

      const dayUsers = new Set(
        predictions
          .filter(p => {
            const predDate = new Date(p.createdAt);
            return predDate >= dayStart && predDate <= dayEnd;
          })
          .map(p => p.userId)
      ).size;

      userActivity.push({
        date: format(currentDate, 'MMM d'),
        users: dayUsers
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      totalUsers,
      activeUsers,
      totalPredictions: predictions.length,
      avgAccuracy,
      userActivity,
      predictionDistribution: predictionDistribution.map((count, correct) => ({
        correct,
        count
      })).slice(1) // Remove 0 correct predictions
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    throw error;
  }
};