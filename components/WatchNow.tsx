import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, Animated, Pressable } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; 
import { useNavigation } from '@react-navigation/native';

interface ImageData {
  id: string;
  imgUrl: string;
  name: string; // This is the video name
  videoUrl: string; // Video URL for navigation
}

const { width } = Dimensions.get('window');

const WatchNow = () => {
  const navigation = useNavigation();
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
              name: ['Godzilla x Kong', 'Game Of Thrones', 'Dune', 'Oppenheimer'][index],
              videoUrl: [
                'Video/Godzilla x Kong.mp4',
                'Video/Game of Thrones.mp4',
                'Video/Dune.mp4',
                'Video/Oppenheimer.mp4',
              ][index],
            };
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        })
      );

      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  const openVideoPage = (videoUrl: string, videoName: string) => {
    navigation.navigate('VideoPage', { videoUrl, videoName }); // Pass both video URL and video name
  };

  const renderItem = ({ item }: { item: ImageData }) => (
    <View style={styles.imageContainer}>
      <Pressable onPress={() => openVideoPage(item.videoUrl, item.name)} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
      </Pressable>
    </View>
  );

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
            <Animated.View key={`dot-${index}`} style={[styles.dot, { opacity: dotOpacity }]} />
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
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      {renderDots()}
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
});
