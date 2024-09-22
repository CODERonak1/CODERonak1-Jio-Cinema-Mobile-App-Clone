import { Text, StyleSheet, View, SafeAreaView, Pressable, TextInput, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Ensure your firebase storage is configured correctly

// Define the shape of image data
interface ImageData {
    id: number; // Unique identifier for each image
    name: string; // Name of the image
    imageUrl: string; // URL to access the image
}

const Search = () => {
    const [search, setSearch] = useState<string>(""); // State to hold the search query
    const [results, setResults] = useState<ImageData[]>([]); // State to hold filtered search results
    const [imageData, setImageData] = useState<ImageData[]>([]); // State to hold images fetched from Firebase

    const navigation = useNavigation(); // Hook to navigate between screens

    // Define your image names here (ensure these match the actual names in Firebase Storage)
    const imageNames = ['12.jpg', 'GOT.jpg', 'HOD.jpg', 'Dune.jpg', 'Oppen.jpg', 'GOK.jpg', 'JE.jpg', 'TLP.jpg', 'joker.jpg', 'pill.jpg'];

    // Fetch images from Firebase Storage on component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Map over image names to create promises for fetching URLs
                const dataPromises = imageNames.map(async (imageName, index) => {
                    const imageRef = ref(storage, imageName); // Reference to the image in Firebase Storage
                    const url = await getDownloadURL(imageRef); // Get the download URL
                    return {
                        id: index + 1, // Unique ID for each image
                        name: imageName, // Name of the image
                        imageUrl: url, // Download URL of the image
                    };
                });

                // Wait for all URL promises to resolve
                const data = await Promise.all(dataPromises); 
                setImageData(data); // Set the fetched image data into state
            } catch (error) {
                console.error("Error fetching images: ", error.code, error.message); // Log any errors
            }
        };

        fetchImages(); // Invoke the fetch function
    }, []); // No dependencies, this runs once on mount

    // Handle search input and filter images based on the search query
    const handleSearch = (text: string) => {
        setSearch(text); // Update the search query
        const filteredResults = imageData.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase()) // Filter images by name
        );
        setResults(filteredResults); // Update the results state
    };

    // Navigate back to the previous screen
    const back = () => {
        navigation.goBack();
        console.log("Just went back from the Search screen");
    };

    // Navigate to the video page when an image is pressed
    const openVideoPage = () => {
        navigation.navigate('VideoPage');
        console.log("Video Page");
    };

    // Render each item in the FlatList
    const renderItem = ({ item }: { item: ImageData }) => (
        <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
    );

    return (
        <SafeAreaView style={styles.background}>
            {/* Search Input Section */}
            <View style={styles.searchContainer}>
                <Pressable onPress={back}>
                    <AntDesign name="left" size={32} color="white" style={{ marginTop: 6, marginLeft: 5 }} />
                </Pressable>
                <TextInput
                    style={styles.input}
                    onChangeText={handleSearch} // Update search on text change
                    value={search} // Bind search value
                    placeholder="Search for movies, shows or sports" // Placeholder text
                    placeholderTextColor="grey" // Placeholder text color
                />
            </View>

            {/* Display Results or Default Images */}
            <View style={styles.container}>
                {results.length > 0 ? ( // If there are search results, display them
                    <FlatList
                        data={results} // Use filtered results for FlatList
                        keyExtractor={(item) => item.id.toString()} // Unique key for each item
                        renderItem={renderItem} // Render each item using renderItem function
                        style={styles.flatList} // Style for the FlatList
                    />
                ) : (
                    <View style={styles.contentContainer}>
                        {imageData.map((item) => ( // If no results, show all images
                            <Pressable
                                key={item.id} // Unique key for each image
                                onPress={openVideoPage} // Navigate to video page on press
                                android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                                <Image
                                    source={{ uri: item.imageUrl }} // Source for the image
                                    style={styles.resultImage} // Style for the image
                                />
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default Search; // Export the Search component

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#1f1e1e",
        height: "100%",
    },

    container: {
        flex: 1,
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },

    searchContainer: {
        height: 50,
        width: '94%',
        borderColor: '#fff4',
        borderWidth: 2,
        margin: 'auto',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    input: {
        color: 'white',
        fontSize: 16,
        flex: 1,
        paddingHorizontal: 10,
    },

    flatList: {
        width: '100%',
    },

    resultImage: {
        height: 160,
        width: 120,
        margin: 10,
        borderRadius: 10,
    },

    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
});
