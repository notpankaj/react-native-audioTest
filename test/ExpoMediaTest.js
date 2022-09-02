import {View, Text} from 'react-native';
import React from 'react';
import * as MediaLibrary from 'expo-media-library';

const ExpoMediaTest = () => {
  const getPermission = async () => {
    return;
    const res = await MediaLibrary.requestPermissionsAsync();
    console.log({res});
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log({permission});
  };

  const audioFiles = async () => {
    try {
      let media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
      });
      // console.log({media});
      media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: media.totalCount,
      });
      console.log({media});
    } catch (error) {
      console.log(error?.message, 'audioFiles()');
    }
  };
  React.useEffect(() => {
    getPermission();
    audioFiles();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{color: 'black'}}>ExpoMediaTest</Text>
    </View>
  );
};

export default ExpoMediaTest;
