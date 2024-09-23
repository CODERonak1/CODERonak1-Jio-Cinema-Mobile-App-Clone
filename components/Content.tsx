import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Use the initialized Firebase storage
import { useNavigation } from '@react-navigation/native';

// Define types for the data structure
type Item = {
  id: string;
  uri: string;
  name: string;
  videoUrl: string; // Added videoUrl field to Item
};

type Section = {
  title: string;
  data: Item[];
};

const Content = () => {
  const navigation = useNavigation();

  const openVideoPage = (videoUrl: string, videoName: string) => {
    // Navigate to VideoPage with videoUrl and videoName as params
    navigation.navigate('VideoPage', { videoUrl, videoName });
    console.log(`Navigating to VideoPage: ${videoName}, ${videoUrl}`);
  };

  const [sections, setSections] = useState<Section[]>([]); // Specify the state type

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRefs = [
          ref(storage, 'Images/Oppen.jpg'),
          ref(storage, 'Images/GOK.jpg'),
          ref(storage, 'Images/HOD.jpg'),
          ref(storage, 'Images/Dune.jpg'),
          ref(storage, 'Images/JE.jpg'),
          ref(storage, 'Images/Man of Steel.jpg'),
          ref(storage, 'Images/Asur.jpg'),
          ref(storage, 'Images/TLP.jpg'),
          ref(storage, 'Images/12 Monkeys.jpg'),
        ];

        // Fetch the download URLs for each image reference
        const urls = await Promise.all(imageRefs.map((imageRef) => getDownloadURL(imageRef)));

        // Sample video URLs corresponding to the images
        const videoUrls = [
          'Video/Oppenheimer.mp4',
          'Video/Godzilla x Kong.mp4',
          'Video/House of the Dragon.mp4',
          'Video/Dune.mp4',
          'Video/Johnny English Strikes Again.mp4',
          'Video/Man of Steel.mp4',
          'Video/Asur.mp4',
          'Video/The Lazarus Project.mp4',
          'Video/12 Monkeys.mp4',
        ];

        // Set the sections with the fetched URLs and video references
        setSections([
          {
            title: "Hot Right Now 🔥",
            data: [
              { id: '1', uri: urls[0], name: "Oppenheimer", videoUrl: videoUrls[0] },
              { id: '2', uri: urls[1], name: "Godzilla x Kong", videoUrl: videoUrls[1] },
              { id: '3', uri: urls[2], name: "House Of The Dragon", videoUrl: videoUrls[2] },
            ],
          },
          {
            title: "Must Watch Movies",
            data: [
              { id: '7', uri: urls[3], name: "Dune", videoUrl: videoUrls[3] },
              { id: '8', uri: urls[4], name: "Johnny English Strikes Again", videoUrl: videoUrls[4] },
              { id: '9', uri: urls[5], name: "Man of Steel", videoUrl: videoUrls[5] },
            ],
          },
          {
            title: "Must Watch Series",
            data: [
              { id: '13', uri: urls[6], name: "Asur", videoUrl: videoUrls[6] },
              { id: '14', uri: urls[7], name: "The Lazarus Project", videoUrl: videoUrls[7] },
              { id: '15', uri: urls[8], name: "12 Monkeys", videoUrl: videoUrls[8] },
            ],
          },
        ]);
      } catch (error) {
        console.error("Error fetching image URLs: ", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <View>
      {sections.map((section) => (
        <View key={section.title}>
          <Text style={styles.title}>{section.title}</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={section.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Pressable 
                  onPress={() => openVideoPage(item.videoUrl, item.name)} // Pass video URL and name when pressed
                  android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
                  <Image
                    fadeDuration={1000}
                    source={{ uri: item.uri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
            )}
          />
        </View>
      ))}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    position: 'relative',
  },
  image: {
    height: 160,
    width: 120,
    borderRadius: 10,
  },
});
