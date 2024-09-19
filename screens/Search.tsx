import { Text, StyleSheet, View, SafeAreaView, Pressable, TextInput, FlatList, Image } from 'react-native';
// Imports the useNavigation hook
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
// Icons
import AntDesign from '@expo/vector-icons/AntDesign';

interface ImageData {
    id: number;
    name: string;
    imageUrl: string;
}

const Search = () => {
    // This is the state for the search bar (now a string)
    const [search, setSearch] = useState<string>("");

    // This is the state for the search results
    const [results, setResults] = useState<ImageData[]>([]);

    // Mock data for images
    const imageData: ImageData[] = [
        { id: 1, name: 'Fall Guy', imageUrl: 'https://i.redd.it/6dc8pfhig5nc1.jpeg' },
        { id: 2, name: 'Wonka', imageUrl: 'https://image.tmdb.org/t/p/original/cDkMUi0i85qgjlRqq92k2yzRHA2.jpg' },
        { id: 3, name: 'Game Of Thrones', imageUrl: 'https://thedigitalbits.com/media/k2/items/cache/6e4b2528701707a3ed973fc804a3e209_XL.jpg' },
        { id: 4, name: 'House Of The Dragon', imageUrl: 'https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_.jpg' },
        { id: 5, name: '12 Monkeys', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTkwOTcxNzMzOV5BMl5BanBnXkFtZTgwODYxNjg0ODE@._V1_.jpg' },
        { id: 6, name: 'Godzilla x Kong', imageUrl: 'https://4kwallpapers.com/images/wallpapers/godzilla-x-kong-the-2560x2560-15847.jpg' },
        { id: 7, name: 'Pill', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZWQ5NTliZjQtODRhNS00ZDc5LTkwYjAtZGYzYzg3YWZhMDJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
        { id: 8, name: 'Oppenheimer', imageUrl: 'https://cdn.wallpapersafari.com/93/54/80bmWj.jpg' },
    ];

    // Handle search and filter results based on input
    const handleSearch = (text: string) => {
        setSearch(text);
        const filteredResults = imageData.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setResults(filteredResults);
    };

    // Initializes the useNavigation hook
    const navigation = useNavigation();

    // Function to navigate back
    const back = () => {
        navigation.goBack();
        console.log("Just went back from the Search screen");
    };

    const openVideoPage = () => {
        navigation.navigate('VideoPage');
        console.log("Video Page");
    }

    // Rendering each result item in FlatList, now only showing images
    const renderItem = ({ item }: { item: ImageData }) => (
        <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
    );

    return (
        <SafeAreaView style={styles.background}>

            <View style={styles.searchContainer}>

                {/* This is the back button */}
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


                {/* <Pressable>
                    <AntDesign name="search1" size={30} color="white" style={{ marginTop: 6, marginRight: 8 }} />
                </Pressable> */}

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
                        {/* Use map to display all images in the imageData array */}
                        {imageData.map((item) => (

                            <Pressable onPress={openVideoPage} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                                <Image
                                    key={item.id}
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
        color: 'white', // Changed text color to white to make it visible on dark background
        fontSize: 16,
        flex: 1, // Allow input to take up the remaining space
        paddingHorizontal: 10, // Added padding for better input experience
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