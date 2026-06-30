import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/Login";
import HomeScreen from "./src/screens/Home";
import DetailsScreen from "./src/screens/Details";
import FavouriteScreen from "./src/screens/Fovorites";
import { FavoriteProvider } from "./src/context/FavoritesContext";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Favourites" component={FavouriteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
}
