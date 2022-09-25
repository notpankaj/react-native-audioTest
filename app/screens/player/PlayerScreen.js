import React, {useContext} from 'react';
import Slider from '@react-native-community/slider';
import {MusicContext} from '../../context/MusicContext';
import styled from 'styled-components/native';
import {COLORS, FONTS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {millisToMinutesAndSeconds} from '../../helpers';

function msConversion(millis) {
  return (millis / 100).toFixed(2);
}

const ICON_SIZE = 25;
Ionicons.loadFont();
const PlayerScreen = () => {
  const {
    seekTo,
    pauseSong,
    playSong,
    progresValue,
    isMusicPlaying,
    nextSong,
    prevSong,
    activeSongObj,
    toggleIsMusicPlaying,
  } = useContext(MusicContext);

  const handleSeek = val => {
    seekTo(val);
  };

  const handlePlay = () => {
    playSong();
    toggleIsMusicPlaying(true);
  };
  const handlePause = () => {
    pauseSong();
    toggleIsMusicPlaying(false);
  };

  const handleNext = () => {
    nextSong();
  };

  const handlePrev = () => {
    prevSong();
  };

  return (
    <Container>
      <Text fontSize={35}>now playing</Text>
      <AlbumContainer />

      <Slider
        style={{
          width: 230,
          height: 25,
          transform: [
            {
              translateX: -15,
            },
          ],
        }}
        minimumValue={0}
        maximumValue={activeSongObj?.duration}
        value={progresValue}
        minimumTrackTintColor={COLORS.accent}
        maximumTrackTintColor="gray"
        thumbTintColor={'transparent' || COLORS.accent}
        onSlidingComplete={handleSeek}
      />

      <TimeStamps>
        <Text fontSize={'10px'} style={{opacity: 0.6}}>
          {msConversion(progresValue)}
        </Text>
        <Text fontSize={'10px'} style={{opacity: 0.6}}>
          -{msConversion(activeSongObj?.duration - progresValue)}
        </Text>
      </TimeStamps>

      <Text fontSize={'12px'}>{activeSongObj.filename}</Text>
      <Text fontSize={'10px'} style={{fontFamily: FONTS.Light}}>
        {`By <unknown>`}
      </Text>

      <ButtonContainer>
        <Button onPress={handlePrev}>
          <Ionicons name="chevron-back" color="white" size={ICON_SIZE} />
        </Button>
        <Button
          onPress={() => {
            isMusicPlaying ? handlePause() : handlePlay();
          }}>
          <Ionicons
            name={isMusicPlaying ? 'pause' : 'caret-forward'}
            color="white"
            size={ICON_SIZE}
          />
        </Button>
        <Button onPress={handleNext}>
          <Ionicons name="chevron-forward" color="white" size={ICON_SIZE} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default PlayerScreen;

const Container = styled.SafeAreaView`
  flex: 1;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 150px;
  background-color: ${COLORS.bgBlack};
`;
const Text = styled.Text`
  font-size: ${props => props.fontSize || '15px'};
  color: ${COLORS.textWhite};
  margin-top: 10px;
  font-family: ${FONTS.Regular};
`;
const AlbumContainer = styled.View`
  width: 200px;
  margin-top: 20px;
  height: 200px;
  background-color: ${COLORS.textWhite};
`;
const ButtonContainer = styled.View`
  padding-top: 20px;
  flex-direction: row;
`;
const TimeStamps = styled.View`
  width: 200px;
  padding-left: 1px;
  padding-right: 1px;
  margin-top: -10px;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border: 3px ${COLORS.textWhite} solid;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
  width: 45px;
  height: 45px;
  margin-right: 15px;
`;
