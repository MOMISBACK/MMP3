import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Activity } from "../types/Activity";

interface Props {
  activity: Activity;
  onDelete: (id: string) => void;
}

export const ActivityItem: React.FC<Props> = ({ activity, onDelete }) => (
  <View style={styles.item}>
    <Text style={styles.itemTitle}>{activity.title}</Text>
    <Text>{activity.type} - {activity.duration} min</Text>
    <Text style={styles.date}>{activity.date}</Text>
    <Button title="Supprimer" color="#E74C3C" onPress={() => onDelete(activity.id)} />
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  itemTitle: { fontWeight: "bold" },
  date: { fontSize: 12, color: "#999", marginTop: 4 },
});