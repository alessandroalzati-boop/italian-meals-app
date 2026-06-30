import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";

export default function MealCard({
  meal,
  toggleFavorite,
  isFavorite,
  onPress,
}: {
  meal: any;
  toggleFavorite: Function;
  isFavorite: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.cardMeals}>
      <Pressable
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          zIndex: 1,
        }}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(meal.idMeal);
        }}
      >
        {isFavorite ? <Text>❤️</Text> : <Text>🖤</Text>}
      </Pressable>

      <Pressable onPress={onPress}>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
          }}
        />

        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {meal.strMeal}
          </Text>
          <Text style={styles.tagMeals}>{meal.strArea}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardMeals: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    minHeight: 220,

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },

  mealImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 15,
  },

  mealInfo: {
    gap: 8,
  },

  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  tagMeals: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: "center",
    fontSize: 14,
    color: "#555",
  },
});
