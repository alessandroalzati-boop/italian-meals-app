import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { validateLogin } from "../users";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  function Login() {
    const user = validateLogin(email, password);

    if (user) {
      login({
        email: user.email,
        name: user.name,
        avatarUri: user.avatarUri,
      });

      navigation.replace("Home", {
        user,
      });
    } else {
      alert("Email o password errati");
    }
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
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

      <Pressable onPress={Login}>
        <Text>Accedi</Text>
      </Pressable>
    </View>
  );
}
