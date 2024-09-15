import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import React from 'react';

interface Props {
  id: number;
  imgUrl: string;
  name: string;
}

const img: Props[] = [
  {
    id: 1,
    imgUrl: 'https://4kwallpapers.com/images/walls/thumbs_3t/15847.jpg',
    name: 'Godzilla x Kong'
  },
  {
    id: 2,
    imgUrl: 'https://thedigitalbits.com/media/k2/items/cache/6e4b2528701707a3ed973fc804a3e209_XL.jpg',
    name: 'Game Of Thrones'
  },
  {
    id: 3,
    imgUrl: 'https://deadline.com/wp-content/uploads/2024/01/MCDDUPA_WB001.jpg?w=1024',
    name: 'Dune 2'
  },
  {
    id: 4,
    imgUrl: 'https://preview.redd.it/oppenheimer-2023-and-mobile-wallpaper-v0-qbnlwj7ptwc91.jpg?width=1080&crop=smart&auto=webp&s=2c1b7b01e8bf7eb7dccad70efd0f63028bedae44',
    name: 'Oppenheimer'
  },
];

const WatchNow = () => {

  return (
    <View style={styles.imageContainer}>

    </View>
  );
};

export default WatchNow;

const styles = StyleSheet.create({
  imageContainer: {

  }
});