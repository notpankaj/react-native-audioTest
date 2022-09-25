import React, {Component, createContext} from 'react';
import * as MediaLibrary from 'expo-media-library';
import TrackPlayer, {Event, State} from 'react-native-track-player';
export const MusicContext = createContext({});

class MusicProvider extends Component {
  INTERVAL = 'abc';

  constructor() {
    super();
    this.state = {
      isReady: false,
      isMusicPlaying: false,
      musicStorage: [],
      activeSongIndex: 0,
      activeSongObj: {},
      progresValue: 0,
      totalNumOfSong: 0, //this from 0 (length of musicStotage
    };

    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.playSongFormIdx = this.playSongFormIdx.bind(this);
    this.toggleIsMusicPlaying = this.toggleIsMusicPlaying.bind(this);

    this.nextSong = this.nextSong.bind(this);
  }
  async getSongsFormDevice() {
    console.log('getSongsFormDevice()');
    try {
      let media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
      });
      media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: media.totalCount,
      });

      this.updateState({
        musicStorage: media?.assets?.map((item, idx) => {
          return {...item, url: item.uri, idx};
        }),
        totalNumOfSong: media.totalCount,
      });

      this.setupTrackPlayer();
    } catch (error) {
      console.error(error);
    }
  }

  updateState(newState) {
    this.setState({
      ...this.state,
      ...newState,
    });
  }

  toggleIsMusicPlaying = bool => {
    this.updateState({isMusicPlaying: bool});
  };

  //  printing
  printStamp = async () => {
    console.log('PrintStamp()');
    const position = await TrackPlayer.getPosition();
    this.updateState({progresValue: position});
  };

  printEnable = () => {
    console.log('printEnable()');
    this.INTERVAL = setInterval(this.printStamp, 100);
  };

  printDisable = () => {
    console.log('printDisable()');
    if (!this?.INTERVAL) return;
    this.updateState({progresValue: 0});
    clearInterval(this.INTERVAL);
  };

  // handle music start
  async nextSong() {
    console.log('nextSong()');
    try {
      await TrackPlayer?.skipToNext();
    } catch (error) {
      console.log(error);
    }
  }
  async prevSong() {
    await TrackPlayer?.skipToPrevious();
  }

  async playSongFormIdx(songIdx) {
    console.log(`playSongFormIdx(${songIdx})`);
    if (songIdx === null || songIdx === undefined) return;

    try {
      const res1 = await TrackPlayer.skip(songIdx);
      console.log({res1});
      this.playSong();
    } catch (error) {
      console.error(error?.error, 'playSongFormIdx');
    }
  }
  playSong() {
    TrackPlayer?.play();
    console.log('playSong()');
    this.printEnable();
  }

  pauseSong() {
    TrackPlayer?.pause();
    console.log('pauseSong()');
    this.printDisable();
  }

  stopSong() {}

  seekTo(val) {
    console.log('seekTo()', val);
    TrackPlayer.seekTo(val);
  }
  async getQueue() {
    try {
      const q = await TrackPlayer.getQueue();
      console.log({q});
      return q;
    } catch (error) {
      console.error(error.message, 'getQueue(');
    }
  }

  // handle music end

  async checkDevicePermissions() {
    console.log('checkDevicePermissions()');
    let granted = false;
    try {
      const permission = await MediaLibrary.getPermissionsAsync();
      console.log({permission}); // canAskAgain
      if (!permission.granted) {
        const request = await MediaLibrary.requestPermissionsAsync();
        console.log({request});
        if (request.granted) {
          granted = true;
        }
      } else {
        granted = true;
      }
    } catch (error) {
      console.error(error);
    }

    return granted;
  }

  async setupTrackPlayer() {
    try {
      const setupTrackPlayer = await TrackPlayer.setupPlayer();
      console.log({setupTrackPlayer});
      this.loadSongToTrackPlayer();
    } catch (error) {
      console.error(error.message, ' ===> setupTrackPlayer');
    }
  }

  async loadSongToTrackPlayer() {
    try {
      const addedSongsToTP = await TrackPlayer.add(this.state.musicStorage);
      // console.log({addedSongsToTP});
      this.addListeners();

      this.updateState({isReady: true}); //will add here in the end
    } catch (error) {
      console.error(error.message, ' ===> loadSongToTrackPlayer');
    }
  }

  async boot() {
    console.log('boot()');
    const hasPermission = await this.checkDevicePermissions();
    if (!hasPermission) {
      // will show not permission scrren
      return;
    }

    this.getSongsFormDevice();
    this.updateState({isReady: true});
  }

  // listeners
  addListeners() {
    console.log('addListeners()');
    try {
      TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
        console.log('Event.PlaybackQueueEnded', event);
        console.log('Q ENDED');
      });

      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, event => {
        console.log('Event.PlaybackTrackChanged', event);

        this.setState({
          ...this.state,
          activeSongIndex: event?.nextTrack,
          activeSongObj: this.state.musicStorage[event?.nextTrack],
        });
        console.log('Track Change');
      });
    } catch (error) {
      console.error(error, 'addListener()');
    }
  }

  removeListeners() {}
  // listeners

  componentDidMount() {
    this.boot();
  }

  componentWillUnmount() {}

  render() {
    console.log(this.state);
    const {
      seekTo,
      nextSong,
      prevSong,
      playSong,
      pauseSong,
      stopSong,
      updateState,
      playSongFormIdx,
      toggleIsMusicPlaying,
    } = this;

    const valuePayload = {
      seekTo,
      nextSong,
      prevSong,
      playSong,
      pauseSong,
      stopSong,
      updateState,
      playSongFormIdx,
      toggleIsMusicPlaying,
    };

    return (
      <MusicContext.Provider value={{...this.state, ...valuePayload}}>
        {this.props.children}
      </MusicContext.Provider>
    );
  }
}

export default MusicProvider;

// duration  // 268.878
// progresValue // 43.405
