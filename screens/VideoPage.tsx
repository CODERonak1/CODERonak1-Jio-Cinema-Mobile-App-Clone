import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase'; 

interface VideoPageParams {
    videoUrl: string;
    videoName: string;
}

const VideoPage = () => {
    const navigation = useNavigation();
    const route = useRoute<{ params: VideoPageParams | undefined }>(); // Allow params to be undefined
    const { videoUrl, videoName } = route.params || { videoUrl: '', videoName: '' }; // Default values if params are undefined

    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!videoUrl) {
            console.error("No video URL provided");
            setIsLoading(false);
            return;
        }

        const fetchVideoUrl = async () => {
            try {
                const url = await getDownloadURL(ref(storage, videoUrl)); // Fetch video URL from Firebase
                setVideoUri(url);
            } catch (error) {
                console.error("Error fetching video URL:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideoUrl();
    }, [videoUrl]);

    return (
        <SafeAreaView style={styles.background}>
            <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="white" style={styles.backIcon} />
            </Pressable>

            <View style={styles.videoContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#d9008d" />
                ) : videoUri ? (
                    <Video 
                        source={{ uri: videoUri }} 
                        style={styles.video} 
                        useNativeControls 
                        resizeMode="cover" 
                    />
                ) : (
                    <Text style={styles.text}>Error loading video.</Text>
                )}
            </View>

            <Text style={styles.videoName}>{videoName}</Text>

            <View style={styles.videoIcons}>
                {['Watchlist', 'Share', 'Download'].map((title, index) => (
                    <Pressable key={index}>
                        <View style={styles.icons}>
                            <AntDesign 
                                name={title === 'Download' ? 'download' : title === 'Watchlist' ? 'eyeo' : 'sharealt'} 
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
    background: {
        backgroundColor: "#1f1e1e",
        height: "100%",
    },
    videoContainer: {
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
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    backIcon: {
        marginTop: 15,
        marginLeft: 15,
    },
    video: {
        width: '100%',
        height: '100%',
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
});
