import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ActivityForm } from "../../components/ActivityForm";
import { ActivityList } from "../../components/ActivityList";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { activities, addActivity, removeActivity } = useActivities();
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Activités de {user ? user.email : "..."}
        </Text>
        <Button title="Déconnexion" onPress={logout} />
      </View>
      <ActivityForm onAdd={addActivity} />
      <ActivityList activities={activities} onDelete={removeActivity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 60 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
});