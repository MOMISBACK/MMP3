import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface Props {
  onAdd: (title: string, type: string, duration: string) => void;
}

export const ActivityForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"course" | "velo" | "natation">("course");
  const [duration, setDuration] = useState("");

  const handlePress = () => {
    if (!title || !duration) return;
    onAdd(title, type, duration);
    setTitle("");
    setDuration("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Titre (ex : Sortie du matin)"
        value={title}
        onChangeText={setTitle}
      />

      {/* Liste déroulante */}
      <Picker
        selectedValue={type}
        onValueChange={(value) => setType(value as any)}
        style={styles.picker}
      >
        <Picker.Item label="Course à pied" value="course" />
        <Picker.Item label="Vélo" value="velo" />
        <Picker.Item label="Natation" value="natation" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Durée (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
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