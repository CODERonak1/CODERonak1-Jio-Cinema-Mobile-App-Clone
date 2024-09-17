import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react';

// components

import Header from '../components/Header';
import WatchNow from '../components/WatchNow';
import Content from '../components/Content';

const Movies = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.background}>
        <Header heading='Movies' />
        <WatchNow />
        <Content />
      </SafeAreaView>
    </ScrollView>
  )
}

export default Movies;

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