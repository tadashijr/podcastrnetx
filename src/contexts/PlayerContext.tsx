import {createContext, useState, ReactNode, useContext} from 'react'


type Episode = {
    title: string;
    members: string; 
    thumbnail: string;  
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playPrevious: () => void;
    usePlayer: () => void;
    playNext: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({children} : PlayerContextProviderProps ){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false) 


    function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
    }
  
    function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true)
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
      setIsLooping(!isLooping)
    }

    function toggleShuffle() {
      setIsShuffling(!isShuffling)
    }
  
    function setPlayingState(state: boolean) {
      setIsPlaying(state);
    }

    function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
    }

    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
    const hasPrevious = isShuffling || currentEpisodeIndex > 0;
    

    function playNext() {

      if (isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      } else if (hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }  
    }

    function playPrevious() {
      if (hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex -1)
      }
    }
  
    return (
      <PlayerContext.Provider 
      value={{episodeList, 
      currentEpisodeIndex, 
      play, 
      isPlaying, 
      togglePlay, 
      setPlayingState, 
      playList, 
      playNext, 
      playPrevious,
      usePlayer, 
      hasNext,
      isLooping,
      toggleLoop,
      isShuffling,
      toggleShuffle,
      clearPlayerState,
      hasPrevious }}>
          { children }
      </PlayerContext.Provider>    
          )
} 

export const usePlayer = ()  => {
  return useContext(PlayerContext); 
}