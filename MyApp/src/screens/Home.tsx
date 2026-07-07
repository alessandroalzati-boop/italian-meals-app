import React from "react";
import { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { fetchItalianMeals } from "../services/mealsApi";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";
import { useAuth } from "../context/AuthContext";
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation, route }: any) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = React.useState("");
  const { user: authUser } = useAuth();

  function searchPlate() {
    const q = search.toLowerCase().trim();

    if (!q) {
      setMeals(allMeals);
      return;
    }

    const filtered = allMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(q),
    );

    setMeals(filtered);
  }
  const user = route.params?.user ?? authUser;
  React.useEffect(() => {
    loadFavoriteIds()
      .then(setFavoriteIds)
      .finally(() => setFavoritesLoaded(true));
  }, []);

  async function loadMeals() {
    try {
      const data = await fetchItalianMeals();
      setMeals(data);
      setAllMeals(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  function toggleFavorite(idMeal: string) {
    setFavoriteIds((current) => {
      const next = current.includes(idMeal)
        ? current.filter((id) => id !== idMeal)
        : [...current, idMeal];
      void saveFavoriteIds(next);
      return next;
    });
  }

  function handleOpenSettings() {
    navigation.navigate("Settings");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        {user?.avatarUri && (
          <Pressable
            onPress={() =>
              navigation.navigate("Profile", {
                userEmail: user.email,
              })
            }
          >
            <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
          </Pressable>
        )}

        <Pressable onPress={handleOpenSettings} style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 32 }}>Piatti Italiani</Text>
      <View style={styles.search}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={searchPlate}
          autoCapitalize="none"
          placeholder="Cerca un piatto..."
          placeholderTextColor="#666"
          style={styles.textInput}
        />
      </View>

      {status === "loading" && <Text>caricamento...</Text>}

      {status === "error" && (
        <View>
          <Text>caricamento fallito riprova</Text>

          <Pressable onPress={loadMeals}>
            <Text>riprova</Text>
          </Pressable>
        </View>
      )}

      {status === "success" && (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => {
            const active = favoriteIds.includes(item.idMeal);

            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  navigation.navigate("Details", {
                    id: item.idMeal,
                  })
                }
              >
                <View style={styles.row}>
                  <Image
                    source={{ uri: item.strMealThumb }}
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: 10,
                    }}
                  />

                  <Text style={styles.text}>{item.strMeal}</Text>
                  <Pressable onPress={() => toggleFavorite(item.idMeal)}>
                    <Text style={styles.favorites}>{active ? "♥" : "♡"}</Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  settingsWrapper: {
    position: "relative",
  },

  settingsButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 999,
  },

  settingsIcon: {
    fontSize: 20,
  },

  menuBox: {
    position: "absolute",
    top: 48,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 100,
    zIndex: 10,
  },

  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },

  menuText: {
    color: "#d9534f",
    fontWeight: "600",
  },

  search: {
    marginVertical: 15,
  },

  textInput: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  favorites: {
    color: "red",
    fontSize: 50,
  },

  item: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  text: {
    fontSize: 18,
  },
});
