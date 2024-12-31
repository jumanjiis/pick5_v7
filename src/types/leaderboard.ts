export interface LeaderboardEntry {
  userId: string;
  userEmail: string;
  displayName: string;
  correctPredictions: number;
  totalPredictions: number;
  accuracy: number;
}