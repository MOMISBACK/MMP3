import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Activity } from "../types/Activity";
import { useActivities } from "../context/ActivityContext";

export const ActivityForm = () => {
  const { addActivity } = useActivities();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Activity["type"]>("course");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = async () => {
    if (!title || !duration) return;

    try {
      await addActivity(title, type, duration, distance, calories);
      // Reset form fields after successful submission
      setTitle("");
      setType("course");
      setDuration("");
      setDistance("");
      setCalories("");
    } catch (error) {
      console.error("Failed to add activity:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre (ex: Sortie du matin)"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
        testID="title-input"
      />
      <View
        style={[
          styles.pickerContainer,
          Platform.OS === "web" && styles.pickerContainerWeb,
        ]}
      >
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={Platform.OS === "web" ? styles.pickerWeb : styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Course à pied" value="course" />
          <Picker.Item label="Vélo" value="velo" />
          <Picker.Item label="Natation" value="natation" />
          <Picker.Item label="Marche" value="marche" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Durée (minutes)"
        placeholderTextColor="#888"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        testID="duration-input"
      />
      <TextInput
        style={styles.input}
        placeholder="Distance (km)"
        placeholderTextColor="#888"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
        testID="distance-input"
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        placeholderTextColor="#888"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        testID="calories-input"
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSubmit}
        testID="add-activity-button"
      >
        <Text style={styles.buttonText}>AJOUTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    ...Platform.select({
      web: {
        width: "50%",
        alignSelf: "center",
      },
    }),
  },
  input: {
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#fff",
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  pickerContainerWeb: {
    height: 50,
  },
  picker: {
    color: "#fff",
  },
  pickerWeb: {
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: 0,
    color: "#fff",
  },
  pickerItem: {
    color: "#fff",
    backgroundColor: "#333",
  },
  buttonContainer: {
    backgroundColor: "#ffd700",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});
