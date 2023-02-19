import { TrackEventInfo } from "../../domain/model/ITrack"

export interface IUpdateTrackRequestDTO {
    packCode: string
    events: TrackEventInfo[]
}