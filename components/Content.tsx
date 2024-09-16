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
};

type Section = {
  title: string;
  data: Item[];
};

const Content = () => {

  const navigation = useNavigation();

  const openVideoPage = () => {
    navigation.navigate('VideoPage');
    console.log("Video Page");
  }

  const [sections, setSections] = useState<Section[]>([]); // Specify the state type

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRefs = [
          ref(storage, 'Oppen.jpg'),
          ref(storage, 'GOK.jpg'),
          ref(storage, 'HOD.jpg'),
          ref(storage, 'Dune.jpg'),
          ref(storage, 'JE.jpg'),
          ref(storage, 'joker.jpg'),
          ref(storage, 'pill.jpg'),
          ref(storage, 'TLP.jpg'),
          ref(storage, '12.jpg'),
        ];

        // Fetch the download URLs for each image reference
        const urls = await Promise.all(imageRefs.map((imageRef) => getDownloadURL(imageRef)));

        // Set the sections with the fetched URLs
        setSections([
          {
            title: "Hot Right Now 🔥",
            data: [
              { id: '1', uri: urls[0], name: "Oppenheimer" },
              { id: '2', uri: urls[1], name: "Godzilla x Kong" },
              { id: '3', uri: urls[2], name: "House Of The Dragon" },
              { id: '4', uri: urls[0], name: "Oppenheimer" },
              { id: '5', uri: urls[1], name: "Godzilla x Kong" },
              { id: '6', uri: urls[2], name: "House Of The Dragon" },
            ]
          },
          {
            title: "Must Watch Movies",
            data: [
              { id: '7', uri: urls[3], name: "Dune" },
              { id: '8', uri: urls[4], name: "Johhny English" },
              { id: '9', uri: urls[5], name: "Joker" },
              { id: '10', uri: urls[3], name: "Dune" },
              { id: '11', uri: urls[4], name: "Johhny English" },
              { id: '12', uri: urls[5], name: "Joker" },
            ]
          },
          {
            title: "Must Watch Series",
            data: [
              { id: '13', uri: urls[6], name: "Pill" },
              { id: '14', uri: urls[7], name: "The Lazarus Project" },
              { id: '15', uri: urls[8], name: "12 Monkeys" },
              { id: '16', uri: urls[6], name: "Pill" },
              { id: '17', uri: urls[7], name: "The Lazarus Project" },
              { id: '18', uri: urls[8], name: "12 Monkeys" },
            ]
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
                <Pressable onPress={openVideoPage} android_ripple={{ color: '#00000035', borderless: false, foreground: true }}>
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