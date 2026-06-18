import { View, Text, Button } from "react-native";
import { products } from "../DB_prodotti";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}>
        Prodotti disponibili
      </Text>

      {products.map((product) => (
        <View key={product.id} style={{ marginBottom: 10 }}>
          <Button
            title={product.name}
            onPress={() =>
              navigation.navigate("Details", {
                product,
              })
            }
          />
          
        </View>
      ))}
    </View>
  );
}
