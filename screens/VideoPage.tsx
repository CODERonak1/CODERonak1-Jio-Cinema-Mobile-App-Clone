import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Video } from 'expo-av';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';

interface VideoPageParams {
    videoUrl: string;
    videoName: string;
}

type VideoPageRouteProp = RouteProp<{ params: VideoPageParams }, 'params'>;

const VideoPage = () => {
    const navigation = useNavigation();
    const route = useRoute<VideoPageRouteProp | undefined>();
    const { videoUrl = '', videoName = '' } = route?.params || {};

    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            if (!videoUrl) {
                console.error("No video URL provided");
                setIsLoading(false);
                return;
            }

            try {
                const url = await getDownloadURL(ref(storage, videoUrl));
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
});
