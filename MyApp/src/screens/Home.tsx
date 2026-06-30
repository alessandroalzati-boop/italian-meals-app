import React from "react";
import { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { fetchItalianMeals } from "../services/mealsApi";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation, route }: any) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [status, setStatus] = useState("loading");

  // recupero utente passato dal Login
  const user = route.params?.user;
  React.useEffect(() => {
    loadFavoriteIds()
      .then(setFavoriteIds)
      .finally(() => setFavoritesLoaded(true));
  }, []);

  async function loadMeals() {
    try {
      const data = await fetchItalianMeals();
      setMeals(data);
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24 }}>
        Ciao {user?.name ?? "utente"}, preferiti:{favoriteIds}
      </Text>

      {user?.avatarUri && (
        <Pressable
          onPress={() =>
            navigation.navigate("Profile", {
              userEmail: user.email,
            })
          }
        >
          <Image
            source={{ uri: user.avatarUri }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginVertical: 10,
            }}
          />
        </Pressable>
      )}

      <Text style={{ fontSize: 32 }}>Piatti Italiani</Text>

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
