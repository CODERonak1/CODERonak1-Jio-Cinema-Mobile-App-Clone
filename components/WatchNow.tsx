import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, Animated, Pressable } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Use the initialized Firebase storage
import { useNavigation } from '@react-navigation/native';

// icons
import Entypo from '@expo/vector-icons/Entypo';


interface ImageData {
  id: string;
  imgUrl: string;
  name: string;
}

const { width } = Dimensions.get('window');

const WatchNow = () => {

  const navigation = useNavigation();

  const openVideoPage = () => {
    navigation.navigate('VideoPage');
    console.log("Video Page");
  }

  const [images, setImages] = useState<ImageData[]>([]);
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    const fetchImages = async () => {
      const imageRefs = [
        ref(storage, 'GOK.jpg'),
        ref(storage, 'GOT.jpg'),
        ref(storage, 'Dune.jpg'),
        ref(storage, 'Oppen.jpg'),
      ];

      const imageUrls = await Promise.all(
        imageRefs.map(async (imageRef, index) => {
          try {
            const imageUrl = await getDownloadURL(imageRef);
            return {
              id: index.toString(),
              imgUrl: imageUrl,
              name: ['Godzilla x Kong', 'Game Of Thrones', 'Dune 2', 'Oppenheimer'][index],
            };
          } catch (error) {
            console.error('Error getting download URL:', error);
            // return {
            //   id: index.toString(),
            //   imgUrl: '../assets/Jio.png',
            //   name: 'Image Error',
            // };
          }
        })
      );

      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  const renderItem = ({ item }: { item: ImageData }) => (
    <View style={styles.imageContainer}>
      <Pressable onPress={openVideoPage} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
      </Pressable>
    </View>
  );

  // Render dot indicators
  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const dotOpacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[styles.dot, { opacity: dotOpacity }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={images} // Use the images state here
        renderItem={renderItem} // Correct renderItem to use renderItem function
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // Set useNativeDriver to false for animated scroll
        )}
        scrollEventThrottle={16}
      />

      {renderDots()}

      <Pressable onPress={openVideoPage} android_ripple={{ color: '#00000035', borderless: false, foreground: true }} style={styles.Button}>
        <Entypo name="controller-play" size={30} color="white" style={{ marginRight: 5 }} />
        <Text style={styles.btnText}>Watch Now</Text>
      </Pressable>
    </View>
  );
};

export default WatchNow;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 480,
    width: 370,
    borderRadius: 12,
    marginVertical: 30,
    marginHorizontal: 20,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#d9008d',
    marginHorizontal: 5,
  },

  Button: {
    backgroundColor: "#d9008d",
    padding: 10,
    borderRadius: 25,
    position: "absolute",
    top: 420,
    left: 120,
    flexDirection: "row",
    overflow: "hidden",

  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});