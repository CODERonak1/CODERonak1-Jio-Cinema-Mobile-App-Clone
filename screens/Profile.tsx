import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
// Imports the usenavigation hook
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

// Profile screen
const Profile = () => {

    // Initializes the usenavigation hook
    const navigation = useNavigation();

    // This function navigates to the previous screen Home
    const back = () => {
        navigation.goBack();
        console.log("Just went back from the Profile screen");
    }

    return (
        <SafeAreaView style={styles.background}>

{/* This is the back button, which navigates back to the home */}
            <Pressable onPress={back}>
                <AntDesign name="left" size={24} color="white" style={{ marginTop: 15, marginLeft: 15 }} />
            </Pressable>

            <View style={styles.container}>
                <Text style={styles.text}>I am Profile</Text>
            </View>
        </SafeAreaView>
    )
}

export default Profile;

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