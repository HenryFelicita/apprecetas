import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//IMPORAR LOS COMPONENTES
import CrearReceta from './screens/CrearReceta';
import ListarReceta from './screens/ListarReceta';
import ListarFavorito from './screens/ListarFavorito';
import MostrarReceta from './screens/MostrarReceta';
import MostrarFavorito from './screens/MostrarFavorito';



export default function App() {
  
  const Stack = createStackNavigator();

  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#800000" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };

  function MyStack(){
    return(
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='PLATOS TIPOCOS ECUADOR' component={ListarReceta} />
        <Stack.Screen name="Crear" component={CrearReceta} />
        <Stack.Screen name="Mostrar" component={MostrarReceta} />
        <Stack.Screen name="Favoritos" component={ListarFavorito} />
        <Stack.Screen name='Ver Favorito' component={MostrarFavorito} />
      </Stack.Navigator>
        
    );
  }
  
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
