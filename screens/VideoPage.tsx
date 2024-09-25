import React, { useEffect, useState } from 'react'; // Importing necessary hooks and components from React
import { StyleSheet, Text, View, SafeAreaView, Pressable, ActivityIndicator } from 'react-native'; // Importing UI components from react-native
import { useNavigation, useRoute } from '@react-navigation/native'; // Hooks for navigation and accessing route params
import { Video } from 'expo-av'; // Video component from expo-av to render video content
import AntDesign from '@expo/vector-icons/AntDesign'; // Importing AntDesign icons
import { getDownloadURL, ref } from 'firebase/storage'; // Firebase functions to get video URL from storage
import { storage } from '../firebase'; // Importing Firebase storage configuration

// Interface to type the expected params for the route
interface VideoPageParams {
    videoUrl: string;
    videoName: string;
}

const VideoPage = () => {
    const navigation = useNavigation(); // Hook for navigation
    const route = useRoute<{ params: VideoPageParams | undefined }>(); // Getting route params and allowing them to be undefined
    const { videoUrl, videoName } = route.params || { videoUrl: '', videoName: '' }; // Destructuring params with default values if undefined

    // State to store the fetched video URL and loading status
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect hook to fetch the video URL from Firebase when the component mounts or when videoUrl changes
    useEffect(() => {
        // If no videoUrl is provided, show an error and stop loading
        if (!videoUrl) {
            console.error("No video URL provided");
            setIsLoading(false);
            return;
        }

        // Async function to fetch video URL from Firebase storage
        const fetchVideoUrl = async () => {
            try {
                const url = await getDownloadURL(ref(storage, videoUrl)); // Fetch video URL from Firebase using the provided videoUrl
                setVideoUri(url); // Update the state with the fetched video URL
            } catch (error) {
                console.error("Error fetching video URL:", error); // Log any errors that occur
            } finally {
                setIsLoading(false); // Stop loading once the URL is fetched or if an error occurs
            }
        };

        fetchVideoUrl(); // Call the async function
    }, [videoUrl]); // Depend on videoUrl, so the effect re-runs if the videoUrl changes

    return (
        <SafeAreaView style={styles.background}> {/* Wrapper to ensure content is inside safe boundaries */}
            <Pressable onPress={() => navigation.goBack()}> {/* Back button to navigate to the previous screen */}
                <AntDesign name="left" size={24} color="white" style={styles.backIcon} /> {/* Back icon */}
            </Pressable>

            <View style={styles.videoContainer}> {/* Container for the video content */}
                {isLoading ? ( // Show a loading spinner while the video is being fetched
                    <ActivityIndicator size="large" color="#d9008d" />
                ) : videoUri ? ( // If videoUri is available, display the video
                    <Video
                        source={{ uri: videoUri }} // Video source is the fetched URL
                        style={styles.video} // Styling for the video
                        useNativeControls // Enable native video controls (play, pause, etc.)
                        resizeMode="cover" // Ensure the video covers the whole container
                    />
                ) : (
                    <Text style={styles.text}>Error loading video.</Text> // Show error message if no video URL is available
                )}
            </View>

            <Text style={styles.videoName}>{videoName}</Text> {/* Display the video name below the video */}

            <View style={styles.videoIcons}> {/* Container for the icons below the video */}
                {['Watchlist', 'Share', 'Download'].map((title, index) => ( // Map through array of icon titles
                    <Pressable key={index}> {/* Each icon is a pressable button */}
                        <View style={styles.icons}> {/* Styling for the icon and text */}
                            <AntDesign
                                name={title === 'Download' ? 'download' : title === 'Watchlist' ? 'eyeo' : 'sharealt'} // Conditionally set the correct icon based on title
                                size={32} color="white" // Icon size and color
                            />
                            <Text style={styles.iconTitle}>{title}</Text> {/* Icon title text */}
                        </View>
                    </Pressable>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default VideoPage;

// Styles for the component
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