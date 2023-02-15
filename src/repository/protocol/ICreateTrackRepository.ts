import { ITrack } from "../../domain/model/ITrack"

export type CreateTrackParams = {
    packCode: string
    status: string
    title: string
    placeName: string
    date: string
    lastUpdateTime: string
}

export interface ICreateTrackRepository {
    createTrack(params: CreateTrackParams): Promise<ITrack>
}