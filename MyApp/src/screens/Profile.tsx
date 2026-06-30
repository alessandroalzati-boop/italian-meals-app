import React from "react";
import {
  Pressable,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import MealCard from "../components/MealCard";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";

interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function FavoritesScreen({ navigation }: { navigation: any }) {
  const [state, setState] = React.useState<{
    status: "idle" | "loading" | "success" | "error";
    items: MealSummary[];
    message: string;
  }>({
    status: "idle",
    items: [],
    message: "",
  });

  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = React.useState(false);

  async function loadFavoriteMeals(ids: string[]) {
    setState({ status: "loading", items: [], message: "" });

    try {
      const data = await fetchItalianMeals();

      const filtered = data.filter((meal: MealSummary) =>
        ids.includes(meal.idMeal),
      );

      setState({ status: "success", items: filtered, message: "" });
    } catch {
      setState({
        status: "error",
        items: [],
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  React.useEffect(() => {
    loadFavoriteIds()
      .then((ids) => {
        setFavoriteIds(ids);
        return loadFavoriteMeals(ids);
      })
      .finally(() => setFavoritesLoaded(true));
  }, []);

  function toggleFavorite(idMeal: string) {
    setFavoriteIds((current) => {
      const next = current.includes(idMeal)
        ? current.filter((id) => id !== idMeal)
        : [...current, idMeal];

      void saveFavoriteIds(next);

      loadFavoriteMeals(next);

      return next;
    });
  }

  if (!favoritesLoaded || state.status === "loading") {
    return (
      <View>
        <ActivityIndicator />
        <Text>Caricamento...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View>
        <Text>{state.message}</Text>
        <Pressable onPress={() => loadFavoriteMeals(favoriteIds)}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonBackText}>Indietro</Text>
      </Pressable>

      <Text style={styles.title}>Preferiti</Text>

      {state.items.length === 0 ? (
        <Text>Nessun preferito</Text>
      ) : (
        <FlatList
          data={state.items}
          renderItem={({ item }) => (
            <View style={{ width: "48%" }}>
              <MealCard
                meal={item}
                toggleFavorite={toggleFavorite}
                isFavorite={true}
                onPress={() =>
                  navigation.navigate("details", { id: item.idMeal })
                }
              />
            </View>
          )}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.rowMeals}
          contentContainerStyle={styles.listMeals}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  buttonBack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },

  buttonBackText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },

  rowMeals: {
    justifyContent: "space-between",
    marginBottom: 15,
  },

  listMeals: {
    paddingBottom: 30,
  },
});
