import React from "react";
import { FlatList } from "react-native";
import { Activity } from "../types/Activity";
import { ActivityItem } from "./ActivityItem";

interface Props {
  activities: Activity[];
  onDelete: (id: string) => void;
}

export const ActivityList: React.FC<Props> = ({ activities, onDelete }) => (
  <FlatList
    data={activities}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <ActivityItem activity={item} onDelete={onDelete} />
    )}
  />
);