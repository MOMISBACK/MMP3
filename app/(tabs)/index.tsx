import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityForm } from "../../components/ActivityForm";
import { ActivityList } from "../../components/ActivityList";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { activities, addActivity, removeActivity } = useActivities();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Activités de {user ? user.name : "..."}
      </Text>
      <ActivityForm onAdd={addActivity} />
      <ActivityList activities={activities} onDelete={removeActivity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 60 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});