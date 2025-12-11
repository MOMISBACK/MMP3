import React from "react";
import { FlatList, Text } from "react-native";
import { useActivities } from "../context/ActivityContext";
import { ActivityItem } from "./ActivityItem";

export const ActivityList: React.FC = () => {
  const { activities, removeActivity, loading } = useActivities();

  if (loading) {
    return <Text>Chargement des activités...</Text>;
  }

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ActivityItem activity={item} onDelete={removeActivity} />
      )}
    />
  );
};