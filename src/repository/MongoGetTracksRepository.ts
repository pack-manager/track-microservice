import { MongoClient } from "../app/database/Mongo"
import { ITrack } from "../domain/model/ITrack"
import { IGetTracksRepository } from "./protocol/IGetTracksRepository"
import { MongoOmit } from "./protocol/MongoOmit"

export class MongoGetTracksRepository implements IGetTracksRepository {
    async getTracksFromUser(packCode: string): Promise<ITrack[]> {
        const packs = await MongoClient.db
            .collection<MongoOmit>("tracks")
            .find({ packCode })
            .toArray()

        return packs.map(({ _id, ...rest }) => ({
            ...rest,
            id: _id.toHexString()
        }))
    }
}