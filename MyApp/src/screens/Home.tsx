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
      <Text style={{fontSize:32}}>Piatti Italiani</Text>
      {status==="loading"&&<Text>caricamento...</Text>}
      {status==="error"&&<View><Text>caricamento fallito riprova</Text>
      <Pressable onPress={loadMeals}>
        <Text>riprova</Text>
      </Pressable>
      </View>}
      {status=="success"&&
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
            <View style={styles.row}>
                <Image source={{uri:item.strMealThumb}} style={{width: 200,height: 200,borderRadius:10}}/>
            <Text style={styles.text}>{item.strMeal}</Text>
            </View>
          
          </TouchableOpacity>
        )}
      />
      }
      
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