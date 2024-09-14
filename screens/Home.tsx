import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react';

// components

import Header from '../components/Header';
// import Content from '../components/Content';
// import WatchNow from '../components/WatchNow';

const Home = () => {
  return (
    <SafeAreaView style={styles.background}>
      <Header heading='Home'/>
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
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