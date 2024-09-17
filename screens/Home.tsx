import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react';

// components

import Header from '../components/Header';
import WatchNow from '../components/WatchNow';
import Content from '../components/Content';


// Home Screen
const Home = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.background}>
        {/* adds the components header, watch now and content in the home*/}
        <Header heading='Home' />
        <WatchNow />
        <Content />
      </SafeAreaView>
    </ScrollView>
  )
}

export default Home;

// Styles

const styles = StyleSheet.create({

  //  makes the background to #1f1e1e
  background: {
    backgroundColor: "#1f1e1e",
    height: "100%",
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
  },
});