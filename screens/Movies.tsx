import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const Movies = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Movies</Text>
      </View>
    </SafeAreaView>
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