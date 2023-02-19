import { ITrack, TrackEventInfo } from "../../domain/model/ITrack"

export type UpdateTrackParams = {
    events: TrackEventInfo[]
    lastUpdateDate: string
    lastUpdateTime: string
}

export interface IUpdateTrackRepository {
    update(packCode: string, params: UpdateTrackParams): Promise<ITrack>
}