import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { fetchMealById } from "../services/mealsApi";
export default function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.id;

  const [meal, setMeal] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  async function fetchMeal() {
    try {
      const data = await fetchMealById(id);
      setMeal(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchMeal();
  }, [id]);

  function getIngredients(meal: any) {
    const list = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        list.push(`${ingredient} - ${measure}`);
      }
    }

    return list;
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Caricamento...</Text>
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text>Meal non trovato</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.subtitle}>
          {meal.strArea} • {meal.strCategory}
        </Text>

        <Text style={styles.section}>Ingredienti</Text>
        {getIngredients(meal).map((item, index) => (
          <Text key={index}>• {item}</Text>
        ))}

        <Text style={styles.section}>Istruzioni</Text>
        <Text>{meal.strInstructions}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "gray",
    marginBottom: 12,
  },

  section: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
  },

  button: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  buttonText: { fontWeight: "600", fontSize: 16 },
});
