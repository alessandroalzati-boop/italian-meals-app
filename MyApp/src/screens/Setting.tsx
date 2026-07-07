import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const { logout } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function handleLogout() {
    logout();
  }

  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <Text style={[styles.title, isDarkTheme && styles.textDark]}>
        Impostazioni
      </Text>

      <View style={styles.card}>
        <Text style={[styles.label, isDarkTheme && styles.textDark]}>
          Tema scuro
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={setIsDarkTheme}
          thumbColor={isDarkTheme ? "#fff" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Indietro</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  containerDark: {
    backgroundColor: "#1f1f1f",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  textDark: {
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
  },
  backButton: {
    marginTop: 16,
    alignItems: "center",
  },
  backText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
