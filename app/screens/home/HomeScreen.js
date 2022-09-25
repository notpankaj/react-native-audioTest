import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {MusicContext} from '../../context/MusicContext';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {musicStorage, playSongFormIdx, toggleIsMusicPlaying, activeSongObj} =
    useContext(MusicContext);

  const handleItemPress = async song => {
    console.log(song);
    navigation.navigate('PlayerScreen');
    playSongFormIdx(song.idx);
    toggleIsMusicPlaying(true);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        paddingLeft: 20,
        width,
        backgroundColor: COLORS.bgBlack,
      }}>
      <View
        style={{
          height: 100,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 45,
            fontFamily: FONTS.Regular,
            color: COLORS.textWhite,
          }}>
          songs
        </Text>
      </View>

      <FlashList
        data={musicStorage}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => handleItemPress(item)}>
              <Button>
                <Ionicons name={'caret-forward'} color="white" size={15} />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONTS.Regular,
                  color: COLORS.textWhite,
                }}>
                {item?.filename?.length > 32
                  ? `${item.filename.substring(0, 30)}...`
                  : item.filename}
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

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border: 2px ${COLORS.textWhite} solid;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 20px;
  height: 20px;
  margin-right: 15px;
  opacity: 0.4;
`;
