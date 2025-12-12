
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Activity } from '../../types/Activity';

interface ActivityFormProps {
  onAdd: (activity: Omit<Activity, 'id' | 'date'>) => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Activity['type']>('course');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = () => {
    if (!title || !duration) return;
    onAdd({
      title,
      type,
      duration: parseInt(duration, 10),
      distance: distance ? parseFloat(distance) : undefined,
      calories: calories ? parseInt(calories, 10) : undefined,
    });
    setTitle('');
    setType('course');
    setDuration('');
    setDistance('');
    setCalories('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre (ex: Sortie du matin)"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
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
      />
      <TextInput
        style={styles.input}
        placeholder="Distance (km)"
        placeholderTextColor="#888"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        placeholderTextColor="#888"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>AJOUTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    color: '#fff',
  },
  pickerItem: {
    color: '#fff',
    backgroundColor: '#333',
  },
  buttonContainer: {
    backgroundColor: '#ffd700',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
