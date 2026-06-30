import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";

export default function ProfileScreen({ route, navigation }: any) {
  const meals = route.params?.favorites;
  console.log("favourite:", meals);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Dettaglio piatto
      </Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => {
          const active = meals.includes(item.idMeal);

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
                <Pressable>
                  <Text style={styles.favorites}>{active ? "♥" : "♡"}</Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Button title="Indietro" onPress={() => navigation.goBack()} />
    </View>
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
