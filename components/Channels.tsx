// imports
import { StyleSheet, Image, ScrollView, Pressable, Text, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Assuming 'storage' is initialized in firebase.js

// channels component
const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState(null); // State to track errors
    const { width } = useWindowDimensions(); // Get the width of the device screen

    useEffect(() => {
        const channelNames = [
            'Colors', 'MTV', 'ColorsKann', 'ColorsMarathi', 'Nick',
            'HBO', 'Peacock', 'ColorsBangla', 'ColorsGuj', 'ColorsInfinity', 'News18India'
        ];

        const fetchImages = async () => {
            try {
                const urls = await Promise.all(channelNames.map(async (name) => {
                    const url = await getDownloadURL(ref(storage, `Channels/${name}.png`));
                    return { name, url };
                }));
                setChannels(urls);
            } catch (err) {
                setError('Failed to load channels.');
                console.error('Error fetching images:', err); // Log the error to see more details
            }
        };

        fetchImages();
    }, []);

    if (error) {
        return (
            <Text style={styles.errorText}>{error}</Text>
        );
    }

    // Calculate image width and height based on screen width
    const imageWidth = width * 0.21; // Make each image occupy 30% of the screen width
    const imageHeight = imageWidth * 0.66; // Keeping a 3:2 aspect ratio

    return (
        <ScrollView style={styles.channels} horizontal showsHorizontalScrollIndicator={false}>
            {channels.map((channel, index) => (
                <Pressable key={index} style={[styles.channel, { width: imageWidth, height: imageHeight + 30 }]}>
                    <Image source={{ uri: channel.url }} style={[styles.channelImg, { width: imageWidth, height: imageHeight }]} />
                </Pressable>
            ))}
        </ScrollView>
    );
};

export default Channels;

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
