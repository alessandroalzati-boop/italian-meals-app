import { View, Text, Image, StyleSheet } from "react-native";

export default function MealCard({ meal }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      <Text style={styles.title}>{meal.strMeal}</Text>

      <Text>{meal.strArea}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
