import { useEffect, useState } from "react";
import { Activity } from "../types/Activity";
import { loadData, saveData } from "../utils/storage";

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    loadData<Activity>("activities").then((stored) => {
      if (stored) setActivities(stored);
    });
  }, []);

  const addActivity = (title: string, type: string, duration: string) => {
    if (!title || !type || !duration) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      type,
      duration: Number(duration),
      date: new Date().toLocaleString(),
    };
    const newList = [newActivity, ...activities];
    setActivities(newList);
    saveData("activities", newList);
  };

  const removeActivity = (id: string) => {
    const newList = activities.filter((a) => a.id !== id);
    setActivities(newList);
    saveData("activities", newList);
  };

  return { activities, addActivity, removeActivity };
}