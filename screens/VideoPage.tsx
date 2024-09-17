import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

const VideoPage = () => {

    const navigation = useNavigation();

    const back = () => {
        navigation.goBack();
        console.log("Just went back from the VideoPage screen");
    }

    return (
        <SafeAreaView style={styles.background}>

            <Pressable onPress={back}>
                <AntDesign name="left" size={24} color="white" style={{ marginTop: 15, marginLeft: 15 }} />
            </Pressable>

            <View style={styles.container}>
                <Text style={styles.text}>I am VideoPage</Text>
            </View>
        </SafeAreaView>
    )
}

export default VideoPage;

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