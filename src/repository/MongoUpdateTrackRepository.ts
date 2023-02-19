import { MongoClient } from "../app/database/Mongo"
import { ITrack } from "../domain/model/ITrack"
import { AppErrorFactory } from "../shared/error/AppError"
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode"
import { IUpdateTrackRepository, UpdateTrackParams } from "./protocol/IUpdateTrackRepository"
import { MongoOmit } from "./protocol/MongoOmit"

export class MongoUpdateTrackRepository implements IUpdateTrackRepository {
    async update(packCode: string, { events, lastUpdateDate, lastUpdateTime }: UpdateTrackParams): Promise<ITrack> {
        const hasTrack = await MongoClient.db
            .collection<MongoOmit>("tracks")
            .findOne({ packCode })

        if (!hasTrack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Track not found")
        }

        const updatedEvents = hasTrack.events.concat(events).reverse()

        await MongoClient.db
            .collection("tracks")
            .updateOne(
                { packCode },
                { $set: { events: updatedEvents, lastUpdateDate, lastUpdateTime } }
            )

        const track = await MongoClient.db
            .collection<MongoOmit>("tracks")
            .findOne({ packCode })

        if (!track) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Track not updated")
        }

        const { _id, ...rest } = track
        return { id: _id.toHexString(), ...rest }
    }
} 