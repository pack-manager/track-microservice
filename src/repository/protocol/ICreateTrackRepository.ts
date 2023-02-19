import { ITrack } from "../../domain/model/ITrack"

export type CreateTrackParams = {
    packCode: string
    events: TrackEvent[]
    lastUpdateDate: string
    lastUpdateTime: string
}

export interface ICreateTrackRepository {
    createTrack(params: CreateTrackParams): Promise<ITrack>
}