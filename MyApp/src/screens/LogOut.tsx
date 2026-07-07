import { View, Text, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LogoutScreen() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Vuoi uscire dall'app?
      </Text>

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Conferma Logout</Text>
      </Pressable>
    </View>
  );
}
