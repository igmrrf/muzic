import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackActiveTrackChanged,
]

export const useLogTrackPlayerState = () => {
    useTrackPlayerEvents(events, async (event) => {
        switch (event.type) {
            case Event.PlaybackState:
                console.log('track state: ', event.state)
                break
            case Event.PlaybackError:
                console.warn('an error occured:', event)

            case Event.PlaybackActiveTrackChanged:
                console.log('track changed:', event)
            default:
                break
        }
    })
}
