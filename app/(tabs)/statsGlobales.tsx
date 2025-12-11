import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useActivities } from "../../context/ActivityContext";
import { statsProcessor, GlobalStats } from "../../services/statsProcessor";
import { Activity } from "../../types/Activity";

const BarChart = ({
  data,
  title,
  unit,
}: {
  data: Record<Activity["type"], number>;
  title: string;
  unit: string;
}) => {
  const maxValue = Math.max(...Object.values(data));
  const entries = Object.entries(data);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      {entries.map(([type, value]) => (
        <View key={type} style={styles.barWrapper}>
          <Text style={styles.barLabel}>{type}</Text>
          <View style={styles.bar}>
            <View
              style={[
                styles.barFill,
                { width: `${(value / (maxValue || 1)) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.barValue}>
            {value.toFixed(1)} {unit}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default function GlobalStatsScreen() {
  const { activities, loading } = useActivities();
  const stats: GlobalStats = statsProcessor.calculateGlobalStats(activities);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement des statistiques...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statistiques Globales</Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Totaux</Text>
        <Text>Activités: {stats.totalActivities}</Text>
        <Text>Durée: {stats.totalDuration.toFixed(2)} min</Text>
        <Text>Distance: {stats.totalDistance.toFixed(2)} km</Text>
        <Text>Calories: {stats.totalCalories.toFixed(2)} kcal</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Moyennes par activité</Text>
        <Text>Durée: {stats.averageDuration.toFixed(2)} min</Text>
        <Text>Distance: {stats.averageDistance.toFixed(2)} km</Text>
        <Text>Calories: {stats.averageCalories.toFixed(2)} kcal</Text>
      </View>

      {stats.longestActivity && (
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Activité la plus longue</Text>
          <Text>
            {stats.longestActivity.title} ({stats.longestActivity.type})
          </Text>
          <Text>Durée: {stats.longestActivity.duration} min</Text>
        </View>
      )}

      <BarChart
        data={stats.durationByType}
        title="Durée par type d'activité"
        unit="min"
      />
      <BarChart
        data={stats.distanceByType}
        title="Distance par type d'activité"
        unit="km"
      />
      <BarChart
        data={stats.caloriesByType}
        title="Calories par type d'activité"
        unit="kcal"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  barLabel: {
    width: 80,
  },
  bar: {
    flex: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 8,
  },
  barFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  barValue: {
    minWidth: 60,
    textAlign: "right",
  },
});
