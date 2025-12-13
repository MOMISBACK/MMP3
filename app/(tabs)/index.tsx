
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from "react-native";
import { ActivityForm } from "../../components/ActivityForm";
import { ActivityList } from "../../components/ActivityList";
import { useActivities } from "../../context/ActivityContext";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { activities, removeActivity, error, clearError } = useActivities();
  const { user, logout } = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("Erreur", error, [{ text: "OK", onPress: clearError }]);
    }
  }, [error]);

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
      <ActivityList activities={activities} onDelete={removeActivity} />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsFormVisible(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFormVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityForm
              onClose={() => setIsFormVisible(false)}
            />
          </View>
        </View>
      </Modal>
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
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#ffd700',
    borderRadius: 28,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: '#111',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
  }
});
