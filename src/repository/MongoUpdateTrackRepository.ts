import { ObjectId } from "mongodb"
import { MongoClient } from "../app/database/Mongo"
import { ITrack } from "../domain/model/ITrack"
import { AppErrorFactory } from "../shared/error/AppError"
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode"
import { IUpdateTrackRepository, UpdateTrackParams } from "./protocol/IUpdateTrackRepository"
import { MongoOmit } from "./protocol/MongoOmit"

export class MongoUpdateTrackRepository implements IUpdateTrackRepository {
    async update(id: string, params: UpdateTrackParams): Promise<ITrack> {
        const hasTrack = await MongoClient.db
            .collection<MongoOmit>("tracks")
            .findOne({ _id: new ObjectId(id) })

        if (!hasTrack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Track not found")
        }

        await MongoClient.db
            .collection("tracks")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...params } }
            )

        const track = await MongoClient.db
            .collection<MongoOmit>("tracks")
            .findOne({ _id: new ObjectId(id) })

        if (!track) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Track not updated")
        }

        const { _id, ...rest } = track
        return { id: _id.toHexString(), ...rest }
    }
} 