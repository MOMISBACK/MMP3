import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useActivities } from "../context/ActivityContext";
import { Activity } from "../types/Activity";

export const ActivityForm: React.FC = () => {
  const { addActivity } = useActivities();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Activity["type"]>("course");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [calories, setCalories] = useState("");

  const handlePress = () => {
    if (!title || !duration) return;
    addActivity(title, type, duration, distance, calories);
    setTitle("");
    setDuration("");
    setDistance("");
    setCalories("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Titre (ex : Sortie du matin)"
        value={title}
        onChangeText={setTitle}
      />

      <Picker
        selectedValue={type}
        onValueChange={(value) => setType(value as any)}
        style={styles.picker}
      >
        <Picker.Item label="Course à pied" value="course" />
        <Picker.Item label="Vélo" value="velo" />
        <Picker.Item label="Natation" value="natation" />
        <Picker.Item label="Marche" value="marche" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Durée (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Distance (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />
      <Button title="Ajouter" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
});