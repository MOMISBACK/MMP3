import React, { createContext, useContext, useEffect, useState } from "react";
import { Activity } from "../types/Activity";
import { activityService } from "../services/activityService";

interface ActivityContextType {
  activities: Activity[];
  addActivity: (
    title: string,
    type: Activity["type"],
    duration: string,
    distance?: string,
    calories?: string,
  ) => void;
  removeActivity: (id: string) => void;
  loading: boolean;
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined,
);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const storedActivities = await activityService.getActivities();
        setActivities(storedActivities);
      } catch (error) {
        console.error("Failed to load activities", error);
        // TODO: Implement user-facing error handling (e.g., toast message)
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  const addActivity = async (
    title: string,
    type: Activity["type"],
    duration: string,
    distance?: string,
    calories?: string,
  ) => {
    if (!title || !type || !duration) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      type,
      duration: Number(duration),
      distance: distance ? Number(distance) : undefined,
      calories: calories ? Number(calories) : undefined,
      date: new Date().toISOString(),
    };

    try {
      const newList = [newActivity, ...activities];
      setActivities(newList);
      await activityService.saveActivities(newList);
    } catch (error) {
      console.error("Failed to save activity", error);
      // TODO: Implement user-facing error handling
    }
  };

  const removeActivity = async (id: string) => {
    try {
      const newList = activities.filter((a) => a.id !== id);
      setActivities(newList);
      await activityService.saveActivities(newList);
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