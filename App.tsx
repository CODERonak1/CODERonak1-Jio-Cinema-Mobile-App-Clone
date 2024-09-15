// Essential Imports

import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// Screens

import Home from './screens/Home';
import Movies from './screens/Movies';
import TvShows from './screens/TvShows';
import Sports from './screens/Sports';
import Downloads from './screens/Downloads';
import LoginOrSignUp from './screens/LoginOrSignUp';
import Search from './screens/Search';
import Profile from './screens/Profile';

// Icons

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Navigators

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <><StatusBar barStyle='light-content' backgroundColor='#1f1e1e' />

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#1f1e1e",
              borderTopWidth: 0,
              height: 60,
              paddingBottom: 5.
            },

            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 12,
            },

            tabBarActiveTintColor: "#d9008d",
            tabBarInactiveTintColor: "gray",
          }}
          initialRouteName='Home'
        >
          <Tab.Screen name="Home" component={Home} options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
          }} />

          <Tab.Screen name="Sports" component={Sports} options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <MaterialIcons name="sports-cricket" size={24} color={color} />
          }} />

          <Tab.Screen name="Movies" component={Movies} options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <MaterialIcons name="movie" size={24} color={color} />
          }} />

          <Tab.Screen name="TvShows" component={TvShows} options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <Entypo name="tv" size={24} color={color} />,
            title: "TV Shows"
          }} />

          <Tab.Screen name="Downloads" component={Downloads} options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <Entypo name="download" size={24} color={color} />
          }} />

        </Tab.Navigator>
      </>
  )
}

const App = () => {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
      <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Stylings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  }
})