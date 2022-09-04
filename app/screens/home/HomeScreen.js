import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {MusicContext} from '../../context/MusicContext';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  const {musicStorage, playSongFormIdx} = useContext(MusicContext);

  const handleItemPress = async item => {
    console.log(item);
    navigation.navigate('PlayerScreen', {
      selectedSong: item,
    });
    playSongFormIdx(item.idx);
  };
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlashList
        data={musicStorage}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{marginTop: 15}}
              onPress={() => handleItemPress(item)}>
              <Text style={{color: 'black', fontSize: 18}}>
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
