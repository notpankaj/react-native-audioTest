import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {MusicContext} from '../../context/MusicContext';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {FONTS} from '../../constants';
const HomeScreen = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {musicStorage, playSongFormIdx, toggleIsMusicPlaying} =
    useContext(MusicContext);

  const handleItemPress = async song => {
    console.log(song);
    navigation.navigate('PlayerScreen');
    playSongFormIdx(song.idx);
    toggleIsMusicPlaying(true);
  };
  return (
    <View style={{flex: 1, padding: 10, width}}>
      <FlashList
        data={musicStorage}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{marginTop: 15}}
              onPress={() => handleItemPress(item)}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontFamily: FONTS.Regular,
                }}>
                {item.filename}
              </Text>
            </TouchableOpacity>
          );
        }}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default HomeScreen;
