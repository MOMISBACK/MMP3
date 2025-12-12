
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
        <Text style={styles.header} numberOfLines={1} ellipsizeMode="tail">
          Activités de {user ? user.email.split('@')[0] : "..."}
        </Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      <ActivityForm onAdd={addActivity} />
      <ActivityList activities={activities} onDelete={removeActivity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginRight: 10,
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#ffd700',
    fontWeight: 'bold',
  }
});
