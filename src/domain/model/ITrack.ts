export interface ITrack {
    id: string
    packCode: string
    events: TrackEventInfo[]
    lastUpdateDate: string
    lastUpdateTime: string
}

export interface TrackEventInfo {
    status: string
    title: string
    placeName: string
}