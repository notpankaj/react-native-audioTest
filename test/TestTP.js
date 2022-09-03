import {View, Text, Button} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import TrackPlayer, {State} from 'react-native-track-player';
import * as MediaLibrary from 'expo-media-library';
import * as Progress from 'react-native-progress';
import Slider from '@react-native-community/slider';

function formatMusic(list) {
  return list?.map(item => {
    return {...item, url: item.uri};
  });
}

let INTERVAL = null;
let ACTIVE_SONG = null;

const TestTP = () => {
  const [musicList, setMusicList] = useState(null);
  const [progressVal, setProgressVal] = useState(0);

  const setupPlayer = async () => {
    console.log('setupPlayer()');
    const init = await TrackPlayer.setupPlayer();
    console.log({init});
  };

  const addMusic = async () => {
    const res = await TrackPlayer.add(formatMusic(musicList));
    console.log({res});
  };

  const playerStatus = async () => {
    // const state = await TrackPlayer.getState();
    // console.log({state});
    // if (state === State.Playing) {
    //   console.log('The player is playing');
    // }

    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    ACTIVE_SONG = trackObject;
    console.log(`trackIndex: ${trackIndex}`);
    console.log(`trackObject: ${trackObject.title}`);
  };

  const handleRemove = async () => {
    const removed = await TrackPlayer.remove(0);
    ACTIVE_SONG = null;
    console.log({removed});
  };

  const handleAudio = type => {
    if (!type) return;

    if (type === 'PLAY') {
      console.log('PLAY');
      TrackPlayer.play();
      printEnable();
      if (!ACTIVE_SONG) {
        playerStatus();
      }
    }
    if (type === 'PAUSE') {
      TrackPlayer.pause();
      printDisable();
    }

    if (type === 'SEEK') {
      TrackPlayer.seekTo(100);
    }

    if (type === 'RESET') {
      TrackPlayer.reset();
      ACTIVE_SONG = null;
    }
  };

  const handlePrev = async () => {
    // Skip to the next track in the queue:
    const res = await TrackPlayer.skipToPrevious();
    ACTIVE_SONG = null;
    console.log(res, 'handlePrev()');
    // Skip to the previous track in the queue:
  };
  const handleNext = async () => {
    try {
      const res = await TrackPlayer.skipToNext();
      ACTIVE_SONG = null;
      console.log(res, 'handleNext()');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintQ = async () => {
    const res = await TrackPlayer.getQueue();
    console.log(res, 'handlePrintQ');
  };

  const printStamp = async () => {
    const duration = await TrackPlayer.getDuration();
    const position = await TrackPlayer.getPosition();

    // console.log({duration, position});
    // console.log(`${duration - position} seconds left.`);
    // console.log(`${(position / duration) * 100} %.`); //0 to 100
    // console.log(`${((position / duration) * 100) / 100} %.`); // 0 to 1
    setProgressVal(((position / duration) * 100) / 100);
  };

  const printEnable = () => {
    setProgressVal(0);
    INTERVAL = setInterval(printStamp, 100);
  };

  const printDisable = () => {
    if (!INTERVAL) return;
    setProgressVal(0);
    clearInterval(INTERVAL);
  };

  React.useState(() => {
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

        setMusicList(media?.assets);
      } catch (error) {
        console.log(error?.message, 'audioFiles()');
      }
    };

    getPermission();
    audioFiles();
    setupPlayer();
  }, []);

  const handleSeek = value => {
    if (!ACTIVE_SONG) {
      console.log('NOT ACTIVE_SONG');
      return;
    }
    const {duration} = ACTIVE_SONG;
    console.log({AD: duration, VAL: value});
    console.log(value * 100);
    console.log((value * 100 * duration) / 100);
    TrackPlayer.seekTo((value * 100 * duration) / 100);
  };

  // console.log({ACTIVE_SONG});
  return (
    <View>
      <Text>TrackPlayer</Text>
      <Button
        title="PLAY"
        onPress={() => {
          handleAudio('PLAY');
        }}
      />
      <Button title="ADD " onPress={addMusic} />
      <Button
        title="PAUSE"
        onPress={() => {
          handleAudio('PAUSE');
        }}
      />
      <Button
        title="RESET"
        onPress={() => {
          handleAudio('RESET');
        }}
      />
      <Button
        title="SEEK"
        onPress={() => {
          handleAudio('SEEK');
        }}
      />
      <Button title="STATUS" onPress={playerStatus} />
      <Button title="REMOVE" onPress={handleRemove} />
      <Button title="INIT" onPress={setupPlayer} />
      <Button title="NExt" onPress={handleNext} />
      <Button title="Prev" onPress={handlePrev} />
      <Button title="Q" onPress={handlePrintQ} />

      <View
        style={{
          width: '100%',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          value={progressVal}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onSlidingComplete={handleSeek}
        />
      </View>
    </View>
  );
};

export default TestTP;
