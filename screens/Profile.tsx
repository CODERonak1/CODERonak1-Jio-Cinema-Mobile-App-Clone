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
                        source={{
                            uri: "https://watchersonthewall.com/wp-content/uploads/2019/04/Jon-Snow-Horse-Winterfell-Season-8.jpg"
                        }}
                        style={styles.userImage}
                    />
                    {/* Username */}
                    <Text style={styles.userName}>JON SNOW</Text>
                    {/* Phone number (masked) */}
                    <Text style={styles.userPhoneNum}>+9174*****433</Text>

                    {/* Other profiles (Kids, Daenerys, Add Profile) */}
                    <View style={styles.otherUsers}>

                        {/* First Profile (Kids) */}
                        <View>
                            <Image
                                source={{
                                    uri: "https://play-lh.googleusercontent.com/K0spSFmDGxZ_oOC3jouk_-mD1MYCashT9HpTi6ynzUuqnDYpjpqUHptu4qI9cmkOTSU"
                                }}
                                style={styles.otherImage}
                            />
                            <Text style={styles.otherName}>Kids</Text>
                        </View>

                        {/* Second Profile (Daenerys) */}
                        <View>
                            <Image
                                source={{
                                    uri: "https://www.telegraph.co.uk/content/dam/fashion/2017/06/19/TELEMMGLPICT000131421802_trans_NvBQzQNjv4BqkUE_BTgBOQu3VWKvpDGX9fr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=680"
                                }}
                                style={styles.otherImage}
                            />
                            <Text style={styles.otherName}>Daenerys</Text>
                        </View>

                        {/* Add new profile button */}
                        <View>
                            <MaterialIcons name="add" size={45} color="white" style={{ marginTop: 3 }} />
                            <Text style={styles.otherName}>Add Profile</Text>
                        </View>
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

                {/* Manage Subscriptions option */}
                <Pressable onPress={() => { }} style={styles.touch}>
                    <Text style={styles.text}>Manage Subscriptions</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>

                {/* Help & Legal option */}
                <Pressable onPress={helpAndLegal} style={styles.touch}>
                    <Text style={styles.text}>Help & Legal</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>

                {/* Logout option */}
                <Pressable style={styles.touch}>
                    <Text style={styles.text}>Logout</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

export default Profile;

// Stylesheet for the Profile screen
const styles = StyleSheet.create({
    // Container for user profile and related items
    userContainer: {
        flex: 1, // Takes up available vertical space
        alignItems: 'center', // Aligns content to center horizontally
        justifyContent: 'center', // Centers content vertically
        position: "relative",
        top: -65, // Shifts the content up by 65 units
    },

    // Background styling for the entire screen
    background: {
        backgroundColor: "#1f1e1e", // Dark background color
        height: "100%", // Fullscreen height
    },

    // Styling for the user's profile box
    user: {
        backgroundColor: "#2b2a2a", // Slightly lighter background color for profile box
        width: "90%", // 90% of the screen width
        height: "30%", // 30% of the screen height
        borderRadius: 10, // Rounded corners for the profile box
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },

    // Styling for the username
    userName: {
        color: "white", // White text color
        fontSize: 20, // Font size for the username
        fontWeight: "bold", // Bold text
        textAlign: "center", // Center the text
        position: "absolute", // Absolute positioning
        top: 50, // Positioned 50 units from the top of the box
    },

    // Profile image styling
    userImage: {
        width: 80, // 80 units wide
        height: 80, // 80 units tall
        borderRadius: 100, // Makes the image circular
        margin: "auto", // Centers the image horizontally
        position: "absolute", // Absolute positioning
        top: -40, // Positioned 40 units above the top of the box
    },

    // Styling for the phone number
    userPhoneNum: {
        color: "#f3f3f3", // Light gray text color
        position: "absolute", // Absolute positioning
        top: 78, // Positioned 78 units from the top
        fontSize: 17, // Font size for the phone number
    },

    // Styling for other user profile images
    otherImage: {
        height: 50, // 50 units tall
        width: 50, // 50 units wide
        borderRadius: 100, // Circular image
    },

    // Styling for other profile names (Kids, Daenerys, etc.)
    otherName: {
        color: "white", // White text color
    },

    // Container for additional user profiles (Kids, Daenerys, Add Profile)
    otherUsers: {
        marginTop: 100, // Spacing above the profiles
        flexDirection: "row", // Align profiles horizontally
        gap: 25, // 25 units of space between profiles
    },

    // Container for other settings and options (Settings, Subscriptions, etc.)
    otherInfo: {
        position: "absolute", // Absolute positioning
        bottom: 160, // Positioned 160 units from the bottom of the screen
        left: 15, // Positioned 15 units from the left edge
        width: "90%", // Takes up 90% of the screen width
    },

    // Styling for the text in the settings and options section
    text: {
        color: "white", // White text color
        fontSize: 15, // Font size
        fontWeight: "bold", // Bold text
        padding: 10, // 10 units of padding around the text
    },

    // General styling for the touchable options (Settings, Help & Legal, Logout, etc.)
    touch: {
        justifyContent: "space-between", // Spreads content evenly with space between
        flexDirection: "row", // Aligns items horizontally
        alignItems: "center", // Centers items vertically
    }

});
