import { Activity } from "../types/Activity";
import { loadData, saveData } from "../utils/storage";

const ACTIVITIES_KEY = "activities";

export const activityService = {
  getActivities: async (): Promise<Activity[]> => {
    try {
      const activities = await loadData<Activity>(ACTIVITIES_KEY);
      return activities || [];
    } catch (error) {
      console.error("Failed to get activities", error);
      throw error;
    }
  },

  saveActivities: async (activities: Activity[]): Promise<void> => {
    try {
      await saveData(ACTIVITIES_KEY, activities);
    } catch (error) {
      console.error("Failed to save activities", error);
      throw error;
    }
  },
};