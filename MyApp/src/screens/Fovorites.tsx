import { View, Text, Button } from "react-native";

export default function FavouriteScreen({ route, navigation }: any) {
  const id = route.params?.id;
  const name = route.params?.name;

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

      <Text style={{ fontSize: 18 }}>ID: {id}</Text>
      <Text style={{ fontSize: 18 }}>Name: {name}</Text>

      <Button title="Indietro" onPress={() => navigation.goBack()} />
    </View>
  );
}
