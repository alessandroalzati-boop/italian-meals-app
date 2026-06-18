import { Button, View, Text } from "react-native";
import React from "react";
import { products } from "../DB_prodotti";

export default function Home({ navigation }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
        Prodotti disponibili
      </Text>
      {products.map((product) => (
        <View key={product.id} style={{ marginBottom: 8 }}>
          <Button
            title={`${product.id}. ${product.name}`}
            onPress={() => navigation.navigate("Details", { product })}
          />
        </View>
      ))}
    </View>
  );
}
