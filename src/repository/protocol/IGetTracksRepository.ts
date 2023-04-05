import { ITrack } from "../../domain/model/ITrack";

export interface IGetTracksRepository {
    getTracksFromUser(packCode: string): Promise<ITrack[]>
}