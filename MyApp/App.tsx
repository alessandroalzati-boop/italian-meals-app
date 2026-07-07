import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/Login";
import HomeScreen from "./src/screens/Home";
import DetailsScreen from "./src/screens/Details";
import ProfileScreen from "./src/screens/Profile";
import SettingsScreen from "./src/screens/Setting";
import { FavoriteProvider } from "./src/context/FavoritesContext";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LogoutScreen from "./src/screens/LogOut";
import * as Linking from "expo-linking";
import { Settings } from "react-native";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/"), "myapp://"],
  config: {
    screens: {
      home: "home",
      meals: "meals",
      details: "meal/:idMeal",
      settings: "settings",
      profile: "profile",
    },
  },
};

function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <AppNavigator />
      </FavoriteProvider>
    </AuthProvider>
  );
}
