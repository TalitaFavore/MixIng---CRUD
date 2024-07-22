import * as React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../src/screens/SplashScreen";
import LoginScreen from "../src/screens/LoginScreen";
import HomeScreen from "../src/screens/HomeScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import AllergiesScreen from "../src/screens/AllergiesScreen";
import HistoryScreen from '../src/screens/HistoryScreen';
import SavedScreen from '../src/screens/SavedScreen';
import SearchScreen from "../src/screens/SearchScreen";
import CustomDrawerContent from "../src/Components/CustomDrawerContent";
import ProductsScreen from "../src/screens/ListProductsScreen";
import AddProductScreen from "../src/screens/AddProductScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon
              name="menu"
              size={30}
              color="#000"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Alergias" component={AllergiesScreen} />
      <Drawer.Screen name="Histórico" component={HistoryScreen} />
      <Drawer.Screen name="Salvos" component={SavedScreen} />
      <Drawer.Screen name="Pesquisar" component={SearchScreen} />
      <Drawer.Screen name="Produtos" component={ProductsScreen} />
      <Drawer.Screen name="Cadastrar" component={AddProductScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeDrawer"
        component={HomeDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
