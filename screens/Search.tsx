import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.text}>I am Search</Text>
            </View>
        </SafeAreaView>
    )
}

export default Search;

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
})