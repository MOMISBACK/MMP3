import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useActivities } from "../hooks/useActivities";
import { Activity } from "../types/Activity";

type Period = "semaine" | "mois" | "annee";

export default function StatsScreen() {
  const { activities } = useActivities();
  const [period, setPeriod] = useState<Period>("semaine");

  // Sécurité : si aucune donnée, on renvoie des stats vides
  const safeActivities: Activity[] = Array.isArray(activities) ? activities : [];

  const filtered = useMemo(() => {
    if (safeActivities.length === 0) return [];

    const now = new Date();

    return safeActivities.filter((act) => {
      if (!act.date) return false; // sécurité
      const d = new Date(act.date);
      if (isNaN(d.getTime())) return false;

      if (period === "semaine") {
        const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays < 7;
      }
      if (period === "mois") {
        return (
          d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        );
      }
      if (period === "annee") {
        return d.getFullYear() === now.getFullYear();
      }
      return false;
    });
  }, [period, safeActivities]);

  const stats = useMemo(() => {
    const totals = { course: 0, velo: 0, natation: 0 };
    filtered.forEach((a) => {
      if (a.type in totals) {
        totals[a.type as keyof typeof totals] += a.duration || 0;
      }
    });
    return totals;
  }, [filtered]);

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

      {safeActivities.length === 0 ? (
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