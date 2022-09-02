import {View, Text, Button} from 'react-native';
import React from 'react';
import TrackPlayer, {State} from 'react-native-track-player';

const SONG_URI =
  'https://ringtonestar.net/saved_ringtones/Touch_It-Ringtonestar.Net.mp3';
var track = {
  url: SONG_URI, // Load media from the network
  title: 'Avaritia',
  artist: 'deadmau5',
  album: 'while(1<2)',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  artwork: 'http://example.com/cover.png', // Load artwork from the network
};

const TrackPlayerCOMP = () => {
  console.log('kkk');

  const setupPlayer = async () => {
    console.log('setupPlayer()');
    const init = await TrackPlayer.setupPlayer();
    console.log({init});
  };

  const addMusic = async () => {
    const res = await TrackPlayer.add(track);
    console.log({res});
  };

  const playerStatus = async () => {
    const state = await TrackPlayer.getState();
    console.log({state});
    if (state === State.Playing) {
      console.log('The player is playing');
    }

    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(`trackIndex: ${trackIndex}`);
    console.log(`trackObject: ${trackObject.title}`);

    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    console.log({duration, position});
    console.log(`${duration - position} seconds left.`);
  };

  const handleRemove = async () => {
    const removed = await TrackPlayer.remove(0);
    console.log({removed});
  };

  const handleAudio = type => {
    if (!type) return;

    if (type === 'PLAY') {
      console.log('PLAY');
      TrackPlayer.play();
    }
    if (type === 'PAUSE') {
      TrackPlayer.pause();
    }

    if (type === 'RESET') {
      TrackPlayer.reset();
    }

    if (type === 'SEEK') {
      // Seek to 12.5 seconds:
      TrackPlayer.seekTo(12.5);
    }
  };

  React.useState(() => {
    setupPlayer();
  }, []);

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
    </View>
  );
};

export default TrackPlayerCOMP;
