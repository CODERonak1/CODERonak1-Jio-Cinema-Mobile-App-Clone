import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
// Imports the useNavigation hook from React Navigation for screen navigation
import { useNavigation } from '@react-navigation/native';
import React from 'react';

// Icons from Expo Vector Icons library
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

// VideoPage screen component
const VideoPage = () => {

    // Initializes the useNavigation hook to handle navigation
    const navigation = useNavigation();

    // This function navigates back to the previous screen (Home)
    const back = () => {
        navigation.goBack();
        console.log("Just went back from the VideoPage screen");
    }

    return (
        // SafeAreaView to handle safe area for devices with notches, etc.
        <SafeAreaView style={styles.background}>

            {/* Back button to navigate back to the previous screen */}
            <Pressable onPress={back}>
                <AntDesign name="left" size={24} color="white" style={{ marginTop: 15, marginLeft: 15 }} />
            </Pressable>

            {/* Video container placeholder */}
            <View style={styles.videoContainer}>
                <Text style={styles.text}>Hi I am video container</Text>
            </View>

            {/* Title of the video being displayed */}
            <View>
                <Text style={styles.videoName}>Godzilla x Kong: The New Empire</Text>
            </View>

            {/* Icons section for watchlist, share, and download options */}
            <View style={styles.videoIcons}>

                {/* Watchlist icon and label */}
                <Pressable>
                    <View style={styles.icons}>
                        <Ionicons name="eye-outline" size={32} color="white" />
                        <Text style={styles.iconTitle}>Watchlist</Text>
                    </View>
                </Pressable>

                {/* Share icon and label */}
                <Pressable>
                    <View style={styles.icons}>
                        <Ionicons name="share" size={32} color="white" />
                        <Text style={styles.iconTitle}>Share</Text>
                    </View>
                </Pressable>

                {/* Download icon and label */}
                <Pressable>
                    <View style={styles.icons}>
                        <AntDesign name="download" size={32} color="white" />
                        <Text style={styles.iconTitle}>Download</Text>
                    </View>
                </Pressable>

            </View>
        </SafeAreaView>
    )
};

export default VideoPage;

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#1f1e1e",
        height: "100%",
    },

    videoContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black",
        height: "30%",
        marginVertical: 10,
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
    },

    videoName: {
        textAlign: "left",
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 15,
    },

    videoIcons: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        marginHorizontal: 50,
    },
    icons: {
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
    },
    iconTitle: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
})