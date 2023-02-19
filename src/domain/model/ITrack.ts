export interface ITrack {
    id: string
    packCode: string
    events: TrackEvent[]
    lastUpdateDate: string
    lastUpdateTime: string
}

export interface TrackEvent {
    status: string
    title: string
    placeName: string
}