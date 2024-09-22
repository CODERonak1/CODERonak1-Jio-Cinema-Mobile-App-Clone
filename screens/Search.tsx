import { Text, StyleSheet, View, SafeAreaView, Pressable, TextInput, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Ensure your firebase storage is configured correctly

interface ImageData {
    id: number;
    name: string;
    imageUrl: string;
}

const Search = () => {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<ImageData[]>([]);
    const [imageData, setImageData] = useState<ImageData[]>([]); // State to hold images from Firebase

    const navigation = useNavigation();

    // Define your image names here
    const imageNames = ['12.jpg', 'GOT.jpg', 'HOD.jpg', 'Dune.jpg', 'Oppen.jpg', 'GOK.jpg', 'JE.jpg', 'TLP.jpg', 'joker.jpg', 'pill.jpg',];

    // Fetch images from Firebase Storage
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const dataPromises = imageNames.map(async (imageName, index) => {
                    const imageRef = ref(storage, imageName); // Reference to the image
                    const url = await getDownloadURL(imageRef); // Get the download URL
                    return {
                        id: index + 1,
                        name: imageName,
                        imageUrl: url,
                    };
                });

                const data = await Promise.all(dataPromises); // Wait for all URLs to be fetched
                setImageData(data); // Set the image data
            } catch (error) {
                console.error("Error fetching images: ", error.code, error.message);
            }
        };

        fetchImages();
    }, []); // No need to include `storage` in dependency array

    const handleSearch = (text: string) => {
        setSearch(text);
        const filteredResults = imageData.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setResults(filteredResults);
    };

    const back = () => {
        navigation.goBack();
        console.log("Just went back from the Search screen");
    };

    const openVideoPage = () => {
        navigation.navigate('VideoPage');
        console.log("Video Page");
    };

    const renderItem = ({ item }: { item: ImageData }) => (
        <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
    );

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.searchContainer}>
                <Pressable onPress={back}>
                    <AntDesign name="left" size={32} color="white" style={{ marginTop: 6, marginLeft: 5 }} />
                </Pressable>
                <TextInput
                    style={styles.input}
                    onChangeText={handleSearch}
                    value={search}
                    placeholder="Search for movies, shows or sports"
                    placeholderTextColor="grey"
                />
            </View>

            <View style={styles.container}>
                {results.length > 0 ? (
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        style={styles.flatList}
                    />
                ) : (
                    <View style={styles.contentContainer}>
                        {imageData.map((item) => (
                            <Pressable
                                key={item.id}
                                onPress={openVideoPage}
                                android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.resultImage}
                                />
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default Search;

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
