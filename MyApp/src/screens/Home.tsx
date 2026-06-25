import React from "react";
import { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchItalianMeals } from "../services/mealsApi"; 

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation }: any) {
  const [meals, setMeals] = useState<Meal[]>([]);
   const [status, setStatus] = useState("loading");
  async function loadMeals() {
   
    try{
       const data = await fetchItalianMeals();
       setMeals(data);
       setStatus("success");
    }catch{
       setStatus("error");
    }
  }
  useEffect(() => {
  loadMeals();
   
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {status==="loading"&&<Text>caricamento...</Text>}
      {status==="error"&&<View><Text>caricamento fallito riprova</Text>
      <Pressable onPress={loadMeals}>
        <Text>riprova</Text>
      </Pressable>
      </View>}
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Details", {
                id: item.idMeal,
              })
            }
          >
            <Text style={styles.text}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  item: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  text: {
    fontSize: 18,
  },
});