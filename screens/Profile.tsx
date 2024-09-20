import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Linking } from 'react-native';
// Imports the usenavigation hook
import { useNavigation } from '@react-navigation/native';
import React from 'react';

// icons
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Profile screen
const Profile = () => {

    // Initializes the usenavigation hook
    const navigation = useNavigation();

    // This function navigates to the previous screen Home
    const back = () => {
        navigation.goBack();
        console.log("Just went back from the Profile screen");
    }

    const helpAndLegal = () => {
        const url = "https://help.jiocinema.com/";
        Linking.openURL(url);
    }

    return (
        <SafeAreaView style={styles.background}>

            {/* This is the back button, which navigates back to the home */}
            <Pressable onPress={back}>
                <AntDesign name="left" size={24} color="white" style={{ marginTop: 15, marginLeft: 15 }} />
            </Pressable>

            <View style={styles.userContainer}>
                <View style={styles.user}>
                    <Image
                        source={{
                            uri: "https://watchersonthewall.com/wp-content/uploads/2019/04/Jon-Snow-Horse-Winterfell-Season-8.jpg"
                        }}
                        style={styles.userImage}
                    />
                    <Text style={styles.userName}>JON SNOW</Text>
                    <Text style={styles.userPhoneNum}>+9174*****433</Text>

                    <View style={styles.otherUsers}>

                        <View>

                            <Image
                                source={{
                                    uri: "https://play-lh.googleusercontent.com/K0spSFmDGxZ_oOC3jouk_-mD1MYCashT9HpTi6ynzUuqnDYpjpqUHptu4qI9cmkOTSU"
                                }}
                                style={styles.otherImage}
                            />
                            <Text style={styles.otherName}>Kids</Text>
                        </View>

                        <View>

                            <Image

                                source={{
                                    uri: "https://www.telegraph.co.uk/content/dam/fashion/2017/06/19/TELEMMGLPICT000131421802_trans_NvBQzQNjv4BqkUE_BTgBOQu3VWKvpDGX9fr7sARQy7EgBjwPUzvqL_M.jpeg?imwidth=680"
                                }}
                                style={styles.otherImage}
                            />
                            <Text style={styles.otherName}>Daenerys</Text>
                        </View>

                        <View>
                            <MaterialIcons name="add" size={45} color="white" style={{ marginTop: 3, }} />

                            <Text style={styles.otherName}>Add Profile</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.otherInfo}>
                <Pressable onPress={() => { }} style={styles.touch}>
                    <Text style={styles.text}>Settings</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>

                <Pressable onPress={() => { }} style={styles.touch}>
                    <Text style={styles.text}>Manage Subscriptions</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>

                <Pressable onPress={helpAndLegal} style={styles.touch}>
                    <Text style={styles.text}>Help & Legal</Text>
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>

                <Pressable style={styles.touch}>
                    <Text style={styles.text}>Logout</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

export default Profile;

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
        fontSize: 20,
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

    userPhoneNum: {
        color: "#f3f3f3",
        position: "absolute",
        top: 78,
        fontSize: 17,
    },

    otherImage: {
        height: 50,
        width: 50,
        borderRadius: 100,

    },

    otherName: {
        color: "white",

    },

    otherUsers: {
        marginTop: 100,
        flexDirection: "row",
        gap: 25,
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
        padding: 10
    },

    touch: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    }

})