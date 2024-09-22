// imports necessary components and hooks from React Native and Firebase
import { StyleSheet, Image, ScrollView, Pressable, Text, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Channels component definition
const Channels = () => {
    // State to store channel data and track errors
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState(null); // State to track errors

    // Get the width of the device screen for responsive design
    const { width } = useWindowDimensions(); 

    // useEffect to fetch channel images when the component mounts
    useEffect(() => {
        // Array of channel names to fetch images for
        const channelNames = [
            'Colors', 'MTV', 'ColorsKann', 'ColorsMarathi', 'Nick',
            'HBO', 'Peacock', 'ColorsBangla', 'ColorsGuj', 'ColorsInfinity', 'News18India'
        ];

        // Asynchronous function to fetch images from Firebase Storage
        const fetchImages = async () => {
            try {
                // Fetch download URLs for each channel image and store in urls array
                const urls = await Promise.all(channelNames.map(async (name) => {
                    const url = await getDownloadURL(ref(storage, `Channels/${name}.png`));
                    return { name, url }; // Return an object with channel name and URL
                }));
                setChannels(urls); // Update state with the fetched URLs
            } catch (err) {
                setError('Failed to load channels.'); // Update error state on failure
                console.error('Error fetching images:', err); // Log the error to see more details
            }
        };

        fetchImages(); // Call the fetchImages function
    }, []); // Empty dependency array means this runs once on mount

    // If there is an error, display an error message
    if (error) {
        return (
            <Text style={styles.errorText}>{error}</Text>
        );
    }

    // Calculate image width and height based on screen width
    const imageWidth = width * 0.21; // Make each image occupy 21% of the screen width
    const imageHeight = imageWidth * 0.66; // Keeping a 3:2 aspect ratio

    return (
        // ScrollView to allow horizontal scrolling of channel images
        <ScrollView style={styles.channels} horizontal showsHorizontalScrollIndicator={false}>
            {channels.map((channel, index) => (
                // Pressable component for each channel image
                <Pressable android_ripple={{ color: '#00000035', borderless: false, foreground: true }} key={index} style={[styles.channel, { width: imageWidth, height: imageHeight + 30 }]}>
                    <Image source={{ uri: channel.url }} style={[styles.channelImg, { width: imageWidth, height: imageHeight }]} />
                </Pressable>
            ))}
        </ScrollView>
    );
};

export default Channels; // Export the Channels component

const styles = StyleSheet.create({
    channels: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    channel: {
        backgroundColor: '#262729',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    channelImg: {
        resizeMode: 'contain', // Ensure the image scales properly
    },
    errorText: {
        color: '#d9008d',
        textAlign: 'center',
        marginTop: 20,
    },
});