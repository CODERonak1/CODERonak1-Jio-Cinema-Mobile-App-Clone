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
import VideoPage from './screens/VideoPage';

// Icons

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Navigators

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// This is the main screen which controls the tab navigations
const Main = () => {
  return (
    <><StatusBar barStyle='light-content' backgroundColor='#1f1e1e' />

      <Tab.Navigator

        // This will control the tab bar
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
        // This sets the initial screen as the Home
        initialRouteName='Home'
      >
        {/* This is the Home tabs style and icon */}
        <Tab.Screen name="Home" component={Home} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
        }} />

        {/* This is the Sports tabs style and icon */}
        <Tab.Screen name="Sports" component={Sports} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="sports-cricket" size={24} color={color} />
        }} />

        {/* This is the Movies tabs style and icon */}
        <Tab.Screen name="Movies" component={Movies} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="movie" size={24} color={color} />
        }} />

        {/* This is the Tv Shows tabs style and icon */}
        <Tab.Screen name="TvShows" component={TvShows} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Entypo name="tv" size={24} color={color} />,
          title: "TV Shows"
        }} />

        {/* This is the Downloads tabs style and icon */}
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
    // THis the navigation container which controls the navigation of the app
    <NavigationContainer>
      {/* This is the stack navigator which controls the screens */}

      {/* This sets the initial screen as the Main */}
      <Stack.Navigator initialRouteName='Main'>

        {/* This is the Main screen which controls the tab navigations */}
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />

        {/* This stack controls the navigation of the search screen */}
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />

        {/* This stack controls the navigation of the Profile screen */}
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />

        {/* This stack controls the navigation of the Video Page screen */}
        <Stack.Screen name="VideoPage" component={VideoPage} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;