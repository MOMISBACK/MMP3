import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useActivities } from "../context/ActivityContext";
import { Activity } from "../types/Activity";

type Period = "semaine" | "mois" | "annee";

export default function StatsScreen() {
  const { activities, loading } = useActivities();
  const [period, setPeriod] = useState<Period>("semaine");

  const filteredActivities = useMemo(() => {
    if (!activities) return [];
    const now = new Date();
    const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);

    return activities.filter((activity) => {
      const activityDate = new Date(activity.date);
      if (isNaN(activityDate.getTime())) return false;

      switch (period) {
        case "semaine":
          return activityDate >= oneWeekAgo;
        case "mois":
          return (
            activityDate.getMonth() === now.getMonth() &&
            activityDate.getFullYear() === now.getFullYear()
          );
        case "annee":
          return activityDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  }, [activities, period]);

  const stats = useMemo(() => {
    const totals: Record<Activity["type"], number> = {
      course: 0,
      velo: 0,
      natation: 0,
    };
    filteredActivities.forEach((a) => {
      if (a.type in totals) {
        totals[a.type] += a.duration || 0;
      }
    });
    return totals;
  }, [filteredActivities]);

  if (loading) {
    return <Text>Chargement des statistiques...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistiques</Text>

      <View style={styles.pickerContainer}>
        <Text>Période :</Text>
        <Picker
          selectedValue={period}
          onValueChange={(v) => setPeriod(v as Period)}
          style={{ flex: 1 }}
        >
          <Picker.Item label="Semaine" value="semaine" />
          <Picker.Item label="Mois" value="mois" />
          <Picker.Item label="Année" value="annee" />
        </Picker>
      </View>

      {activities.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            Aucune activité enregistrée pour le moment 💤
          </Text>
        </View>
      ) : (
        <View style={styles.statsBox}>
          <Text>🏃 Course à pied : {stats.course} min</Text>
          <Text>🚴 Vélo : {stats.velo} min</Text>
          <Text>🏊 Natation : {stats.natation} min</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statsBox: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 5,
  },
  emptyBox: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
    borderRadius: 8,
  },
  emptyText: { color: "#777" },
});