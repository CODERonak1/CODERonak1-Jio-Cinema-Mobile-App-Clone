import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Defining the type of prop for the heading 
interface Props {
  heading: string;
}

// Header
const Header = ({ heading }: Props) => {
  // Initialises the navigation object for handling the navigation 
  const navigation = useNavigation();
  
  // opens the the search screen when search icon is pressed 
  const openSearch = () => {
    navigation.navigate('Search');
    console.log("Opened Search");
  }

  // opens the the search screen when search icon is pressed 
  const openProfile = () => {
    navigation.navigate('Profile');
    console.log("Opened Profile");
  }

  return (
    <View style={styles.container}>

      {/* This image is at the right side*/}
      <Image
        style={styles.logo}
        source={
          require('../assets/Logo1.png')
        }
      />

      {/* Heading is at the center */}
      <Text style={styles.heading}>{heading}</Text>

      {/* The container holds the search icon and the profile picture on the right side*/}
      <View style={styles.searchAndProfile}>

        {/* Opens search screen on pressed on the search icon */}
        <Pressable onPress={openSearch}>
          <Ionicons name="search-outline" size={32} color="white" />
        </Pressable>

        {/* Opens the profile screen on press on the profile image*/}
        <Pressable onPress={openProfile}>
          <Image
            source={
              require('../assets/guest.png')
            }
            style={styles.logo}
          />
        </Pressable>

      </View>
    </View>
  )
}

export default Header;

// Stylings
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  logo: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },

  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 45
  },

  searchAndProfile: {
    flexDirection: "row",
    gap: 20,
  },
});