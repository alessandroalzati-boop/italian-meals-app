import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@test.it" && password === "1234") {
      navigation.replace("Home");
    } else {
      alert("Credenziali errate");
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}>
        Login
      </Text>

      <Text>Email</Text>
      <TextInput
        placeholder="Inserisci email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
        }}
      />

      <Text>Password</Text>
      <TextInput
        placeholder="Inserisci password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Accedi" onPress={handleLogin} />
    </View>
  );
}
