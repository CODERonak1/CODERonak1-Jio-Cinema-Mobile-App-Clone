import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

const VideoPage = () => {
    const navigation = useNavigation();
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPortrait, setIsPortrait] = useState(true);
    let orientationLockTimeout; // Timeout variable

    // Function to handle orientation changes
    const handleOrientationChange = async () => {
        const dim = await ScreenOrientation.getOrientationAsync();
        const portrait = dim === ScreenOrientation.OrientationLock.PORTRAIT_UP || dim === ScreenOrientation.OrientationLock.PORTRAIT_DOWN;

        if (isPortrait !== portrait) {
            setIsPortrait(portrait);

            // Clear the previous timeout
            clearTimeout(orientationLockTimeout);

            if (portrait) {
                // Allow auto-rotation when in portrait
                orientationLockTimeout = setTimeout(() => {
                    ScreenOrientation.unlockAsync();
                }, 200); // Delay for stabilization
            } else {
                // Lock to landscape mode if in landscape orientation
                orientationLockTimeout = setTimeout(() => {
                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                }, 200); // Delay for stabilization
            }
        }
    };

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const url = await getDownloadURL(ref(storage, 'Godzilla x Kong.mp4'));
                setVideoUrl(url);
            } catch (error) {
                console.error("Error fetching video URL:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVideoUrl();

        // Initial orientation check
        handleOrientationChange();

        // Add event listener for orientation change
        const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

        return () => {
            subscription.remove(); // Clean up the event listener
            clearTimeout(orientationLockTimeout); // Clear timeout on cleanup
            ScreenOrientation.unlockAsync(); // Unlock orientation on cleanup
        };
    }, [isPortrait]);

    return (
        <SafeAreaView style={styles.background}>
            <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="white" style={styles.backIcon} />
            </Pressable>

            <View style={isPortrait ? styles.videoContainerPortrait : styles.videoContainerLandscape}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#d9008d" />
                ) : videoUrl ? (
                    <Video 
                        source={{ uri: videoUrl }} 
                        style={isPortrait ? styles.videoPortrait : styles.videoLandscape} 
                        useNativeControls 
                        resizeMode="contain" 
                    />
                ) : (
                    <Text style={styles.text}>Error loading video.</Text>
                )}
            </View>

            <Text style={styles.videoName}>Godzilla x Kong: The New Empire</Text>

            <View style={styles.videoIcons}>
                {['Watchlist', 'Share', 'Download'].map((title, index) => (
                    <Pressable key={index}>
                        <View style={styles.icons}>
                            <Ionicons 
                                name={title === 'Download' ? 'download' : title === 'Watchlist' ? 'eye-outline' : 'share'} 
                                size={32} color="white" 
                            />
                            <Text style={styles.iconTitle}>{title}</Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default VideoPage;

const styles = StyleSheet.create({
    background: { backgroundColor: "#1f1e1e", height: "100%" },
    videoContainerPortrait: { alignItems: 'center', justifyContent: 'center', backgroundColor: "black", height: "30%", marginVertical: 10 },
    videoContainerLandscape: { alignItems: 'center', justifyContent: 'center', backgroundColor: "black", height: "30%", marginVertical: 10 },
    text: { fontSize: 24, fontWeight: 'bold', color: "white" },
    videoName: { textAlign: "left", color: "white", fontSize: 15, fontWeight: "bold", marginLeft: 15 },
    videoIcons: { justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginTop: 30, marginHorizontal: 50 },
    icons: { flexDirection: "column", alignItems: "center", gap: 5 },
    iconTitle: { color: "white", fontSize: 15, fontWeight: "bold" },
    backIcon: { marginTop: 15, marginLeft: 15 },
    videoPortrait: { width: '100%', height: '100%' },
    videoLandscape: { width: '100%', height: '100%' }, // Modify as needed for landscape
});
