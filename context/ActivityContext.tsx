import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Activity } from "../types/Activity";
import { activityService } from "../services/activityService";
import { useAuth } from "./AuthContext"; // Assuming useAuth provides user/token

interface ActivityContextType {
  activities: Activity[];
  addActivity: (
    title: string,
    type: Activity["type"],
    duration: string,
    distance?: string,
    calories?: string,
  ) => Promise<void>;
  removeActivity: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined,
);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get user from AuthContext

  const clearError = () => setError(null);

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const storedActivities = await activityService.getActivities(token);
        setActivities(storedActivities);
      } else {
        setActivities([]); // Clear activities if no token
      }
    } catch (error) {
      console.error("Failed to load activities", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadActivities();
    } else {
      setActivities([]); // Clear activities on logout
    }
  }, [user, loadActivities]);

  const addActivity = async (
    title: string,
    type: Activity["type"],
    duration: string,
    distance?: string,
    calories?: string,
  ) => {
    if (!title || !type || !duration) return;

    const newActivityData = {
      title,
      type,
      duration: Number(duration),
      distance: distance ? Number(distance) : undefined,
      calories: calories ? Number(calories) : undefined,
    };

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      const newActivity = { ...newActivityData, id: tempId, date: new Date().toISOString() };
      setActivities(prev => [newActivity, ...prev]);

      const savedActivity = await activityService.addActivity(newActivityData, token);

      // Replace temporary activity with the one from the server
      setActivities(prev => prev.map(a => a.id === tempId ? savedActivity : a));

    } catch (error) {
      console.error("Failed to save activity", error);
      setError("Impossible d'ajouter l'activité. Veuillez réessayer.");
      // Rollback optimistic update
      await loadActivities();
    }
  };

  const removeActivity = async (id: string) => {
    const originalActivities = [...activities];
    // Optimistic update
    setActivities(prev => prev.filter(a => a.id !== id && a._id !== id));

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      await activityService.deleteActivity(id, token);
    } catch (error) {
      console.error("Failed to remove activity", error);
      setError("Impossible de supprimer l'activité. Veuillez réessayer.");
      // Rollback
      setActivities(originalActivities);
    }
  };

  return (
    <ActivityContext.Provider
      value={{ activities, addActivity, removeActivity, loading, error, clearError }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivityProvider");
  }
  return context;
}
