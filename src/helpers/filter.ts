import { Track } from 'react-native-track-player'

export const trackTitleFilter = (title: string) => (track: Track) =>
    track.title?.toLowerCase().includes(title.toLowerCase())

export const nameFilter =
    <T extends { name: string }>(name: string) =>
    (item: T) =>
        item?.name.toLowerCase().includes(name.toLowerCase())
