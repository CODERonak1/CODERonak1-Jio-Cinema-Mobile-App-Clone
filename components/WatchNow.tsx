import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, FlatList, Animated, Pressable } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import from expo-linear-gradient

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
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    const fetchImages = async () => {
      const imageRefs = [
        ref(storage, 'Images/GOK.jpg'),
        ref(storage, 'Images/GOT.jpg'),
        ref(storage, 'Images/Dune.jpg'),
        ref(storage, 'Images/Oppen.jpg'),
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
      setIsLoading(false); // Set loading to false once images are fetched
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
        {/* Linear Gradient below the image */}
        
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

  // Custom skeleton loader
  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
    </View>
  );

  return (
    <View>
      {isLoading ? (
        // Custom skeleton loader while images are loading
        renderSkeleton()
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default WatchNow;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
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
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  skeletonImage: {
    height: 480,
    width: 370,
    borderRadius: 12,
    backgroundColor: '#2B2B2B', 
  },
});