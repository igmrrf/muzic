import { Track } from '@/components/TrackLists'

export const trackTitleFilter = (title: string) => (track: Track) =>
    track.title?.toLowerCase().includes(title.toLowerCase())
