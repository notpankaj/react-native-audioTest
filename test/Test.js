import React, {useEffect, useRef, useState} from 'react';
import * as MediaLibrary from 'expo-media-library';
import {View, Text, Button} from 'react-native';
import Sound from 'react-native-sound';
const SONG_URI =
  'https://ringtonestar.net/saved_ringtones/Touch_It-Ringtonestar.Net.mp3';

let ACTIVE_INDEX = 0;
const Test = () => {
  const [musicList, setMusicList] = useState(null);
  const [music, setMusic] = useState(null);
  const [second, setSecond] = useState(0);
  const [duration, setDuration] = useState(0);
  let intervalRef = useRef(null).current;
  const play = () => {
    console.log(musicList[ACTIVE_INDEX]);
    let summer = new Sound(musicList[ACTIVE_INDEX], null, err => {
      if (err) {
        console.log('error', err);
        return;
      }
      summer.play(success => {
        console.log('end', success);
      });
      setDuration(summer.getDuration());
    });
    console.log('summer', summer);
    setMusic(summer);
  };

  const clearTimeoutRef = () => {
    console.log('clearTimeoutRef()');
    try {
      clearInterval(intervalRef);
    } catch (error) {
      console.log(clearTimeout);
    }
  };
  useEffect(() => {
    if (music) {
      console.log(music);
      intervalRef = setInterval(() => {
        console.log('HI1');
        if (!music.isPlaying()) return;
        music.getCurrentTime((second, play) => {
          console.log('HI2', second);
          setSecond(second);
        });
      }, 1000);
    }

    return () => {
      clearTimeoutRef();
    };
  }, [music]);
  const setVolume = type => {
    const volume = music.getVolume();
    console.log(volume);
    if (type == '+') {
      const newVolume = volume + 0.1;
      music.setVolume(newVolume);
    } else {
      const newVolume = volume - 0.1;
      music.setVolume(newVolume);
    }
  };

  const handleNext = () => {
    ACTIVE_INDEX = ACTIVE_INDEX + 1;
    music?.release();
    play();
  };
  const handlePrev = () => {
    ACTIVE_INDEX = ACTIVE_INDEX - 1;
    music?.release();
    play();
  };

  React.useEffect(() => {
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
  }, []);

  return (
    <View>
      <Button
        title="Play"
        onPress={() => {
          play();
        }}
      />
      <Button
        title="Pause"
        onPress={() => {
          music.pause();
          clearTimeoutRef();
        }}
      />

      <Button
        title="Play"
        onPress={() => {
          music.play();
        }}
      />

      <Button
        title="Stop"
        onPress={() => {
          music.stop();
          clearTimeoutRef();
        }}
      />

      <Button
        title="Vol +"
        onPress={() => {
          setVolume('+');
        }}
      />

      <Button
        title="Vol -"
        onPress={() => {
          setVolume('-');
        }}
      />

      <Button
        title="set current Time"
        onPress={() => {
          music.setCurrentTime(12);
        }}
      />

      <Button
        title="status"
        onPress={() => {
          console.log(music.isPlaying());
        }}
      />

      <Button title="NExt" onPress={handleNext} />
      <Button title="Prev" onPress={handlePrev} />
      <Text>
        {second} / Total Second {duration}
      </Text>
    </View>
  );
};
export default Test;
