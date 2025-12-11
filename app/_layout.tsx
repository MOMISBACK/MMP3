import { Stack } from "expo-router";
import { ActivityProvider } from "../context/ActivityContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ActivityProvider>
        <Stack />
      </ActivityProvider>
    </AuthProvider>
  );
}
