import { View, Text, Button } from "react-native";

export default function Details({ route, navigation }) {
  const product = route.params?.product;

  if (!product) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Prodotto non trovato</Text>

        <Button
          title="Torna alla Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        {product.name}
      </Text>

      <Text style={{ fontSize: 18 }}>
        ID: {product.id}
      </Text>

      <Button
        title="Indietro"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}