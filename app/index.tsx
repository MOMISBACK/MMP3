import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityForm } from "../components/ActivityForm";
import { ActivityList } from "../components/ActivityList";
import { useActivities } from "../hooks/useActivities";

export default function HomeScreen() {
  const { activities, addActivity, removeActivity } = useActivities();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Activités Sportives</Text>
      <ActivityForm onAdd={addActivity} />
      <ActivityList activities={activities} onDelete={removeActivity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 60 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});