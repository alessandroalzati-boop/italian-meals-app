import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { validateLogin } from "../users";

export default function LoginScreen({ navigation }:any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function Login() {
    const user = validateLogin(email, password);

    if (user) {
      setLoggedIn(true);

      navigation.replace("Home", {
        user: user,
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