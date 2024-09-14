import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  heading: string;
}

const navigation = useNavigation();

const openSearch = () => {
  navigation.navigate('Search');
  console.log("Opened Search");
}

const Header = ({ heading }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={
          require('../assets/Logo.png')
        }
      />

      <Text style={styles.heading}>{heading}</Text>

      <View style={styles.searchAndProfile}>

        <Pressable onPress={openSearch}>
          <Ionicons name="search-outline" size={32} color="white" />
        </Pressable>

        <Pressable>
          <Image
            source={{ uri: 'https://watchersonthewall.com/wp-content/uploads/2019/04/Jon-Snow-Horse-Winterfell-Season-8.jpg' }}
            style={styles.logo}
          />
        </Pressable>

      </View>

    </View>
  )
}

export default Header;

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