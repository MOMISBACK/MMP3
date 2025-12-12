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
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined,
);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user from AuthContext

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

      await activityService.addActivity(newActivityData, token);
      await loadActivities(); // Reload activities to get the latest list
    } catch (error) {
      console.error("Failed to save activity", error);
      // TODO: Implement user-facing error handling
    }
  };

  const removeActivity = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      await activityService.deleteActivity(id, token);
      await loadActivities(); // Reload activities
    } catch (error) {
      console.error("Failed to remove activity", error);
      // TODO: Implement user-facing error handling
    }
  };

  return (
    <ActivityContext.Provider
      value={{ activities, addActivity, removeActivity, loading }}
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
