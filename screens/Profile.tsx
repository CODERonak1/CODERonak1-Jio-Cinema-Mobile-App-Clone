import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Linking } from 'react-native';
// Imports the useNavigation hook from React Navigation for screen navigation
import { useNavigation } from '@react-navigation/native';
import React from 'react';

// Icons from Expo Vector Icons library
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Profile screen component
const Profile = () => {

    // Initializes the useNavigation hook to handle navigation
    const navigation = useNavigation();

    // This function navigates back to the previous screen (Home)
    const back = () => {
        navigation.goBack();
        console.log("Just went back from the Profile screen");
    }

    // This function opens the Help & Legal URL in the default browser
    const helpAndLegal = () => {
        const url = "https://help.jiocinema.com/";
        Linking.openURL(url);
    }

    return (
        // SafeAreaView to handle safe area for devices with notches, etc.
        <SafeAreaView style={styles.background}>

            {/* Back button to navigate back to the previous screen */}
            <Pressable onPress={back}>
                <AntDesign name="left" size={24} color="white" style={{ marginTop: 15, marginLeft: 15 }} />
            </Pressable>

            {/* User profile container */}
            <View style={styles.userContainer}>
                <View style={styles.user}>
                    {/* Profile image */}
                    <Image
                        source={
                            require("../assets/guest.png")
                        }
                        style={styles.userImage}
                    />

                    <View>
                    <Text style={styles.guest}>Guest</Text>
                    <Pressable style={styles.loginBtn} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                        <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                    </View>
                </View>
            </View>


            {/* Other settings and options */}
            <View style={styles.otherInfo}>

                {/* Settings option */}
                <Pressable onPress={() => { }} style={styles.touch}>
                    <Text style={styles.text}>Settings</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>


                {/* Subscribe option */}
                <Pressable style={styles.touch}>
                    <Text style={styles.text}>Subscribe Now</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>

                {/* Help & Legal option */}
                <Pressable onPress={helpAndLegal} style={styles.touch}>
                    <Text style={styles.text}>Help & Legal</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Profile;

// Stylesheet for the Profile screen
const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
        top: -65,
    },

    background: {
        backgroundColor: "#1f1e1e",
        height: "100%",
    },

    user: {
        backgroundColor: "#2b2a2a",
        width: "90%",
        height: "30%",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    userName: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        top: 50,
    },

    userImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        margin: "auto",
        position: "absolute",
        top: -40,
    },

    otherInfo: {
        position: "absolute",
        bottom: 160,
        left: 15,
        width: "90%",
    },

    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        padding: 10,
    },

    guest: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        position: "absolute",
        top: -50,
        right: 28,
        marginVertical: 10,
    },

    loginBtn: {
        backgroundColor: "#d9008d",
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 50,
        marginTop: 30,
    },

    loginText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },

    touch: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
});