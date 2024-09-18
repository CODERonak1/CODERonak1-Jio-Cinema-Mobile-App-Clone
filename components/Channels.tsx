import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';

const Channels = () => {
    return (

        // using scroll view for the horizontal channel
        <ScrollView style={styles.channels} horizontal={true} showsHorizontalScrollIndicator={false}>

            {/* colors */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/Colors.png')} style={styles.channelImg} />
            </Pressable>

            {/* MTV */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/MTV.png')} style={styles.channelImg} />
            </Pressable>

            {/* colors kannada */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/ColorsKann.png')} style={styles.channelImg} />
            </Pressable>

            {/* colors marathi */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/ColorsMarathi.png')} style={styles.channelImg} />
            </Pressable>

            {/* nick */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/Nick.png')} style={styles.channelImg} />
            </Pressable>

            {/* HBO */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/HBO.png')} style={styles.channelImg} />
            </Pressable>

            {/* peacock */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/Peacock.png')} style={styles.channelImg} />
            </Pressable>

            {/* colors bangla */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/ColorsBangla.png')} style={styles.channelImg} />
            </Pressable>

            {/* colors gujrathi */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/ColorsGuj.png')} style={styles.channelImg} />
            </Pressable>

            {/* colors infinity */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/ColorsInfinity.png')} style={styles.channelImg} />
            </Pressable>

            {/* news 18 india */}
            <Pressable style={styles.channel} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                <Image source={require('../assets/channels/News18India.png')} style={styles.channelImg} />
            </Pressable>

        </ScrollView>
    );
};

export default Channels;

const styles = StyleSheet.create({
    channels: {

    },
    channel: {
        backgroundColor: '#262729',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 90,
        marginHorizontal: 0,
        marginLeft: 10,

    },
    channelImg: {
        height: 60,
        width: 90,
    },
});
