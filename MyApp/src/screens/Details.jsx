import { Text, Button, View } from "react-native";
import React from "react";

export default function Details({ route, navigation }) {
  const product = route.params?.product;

  if (!product) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>
          Prodotto non trovato.
        </Text>
        <Button title="Torna indietro" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        {product.name}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        ID prodotto: {product.id}
      </Text>
      <Button title="Torna indietro" onPress={() => navigation.goBack()} />
    </View>
  );
}
