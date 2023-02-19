import { ITrack } from "../../domain/model/ITrack"

export type UpdateTrackParams = {
    events: TrackEvent[]
    lastUpdateDate: string
    lastUpdateTime: string
}

export interface IUpdateTrackRepository {
    update(id: string, params: UpdateTrackParams): Promise<ITrack>
}