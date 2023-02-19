import { MongoClient } from "../app/database/Mongo";
import { ITrack } from "../domain/model/ITrack";
import { AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { CreateTrackParams, ICreateTrackRepository } from "./protocol/ICreateTrackRepository";
import { MongoOmit } from "./protocol/MongoOmit";

export class MongoCreateTrackRepository implements ICreateTrackRepository {
    async createTrack(params: CreateTrackParams): Promise<ITrack> {
        const hasTrack = await MongoClient.db
            .collection<MongoOmit>("tracks")
            .findOne({ packCode: params.packCode })

        if (hasTrack) {
            throw AppErrorFactory.create(HttpStatusCode.CONFLICT, "Track already exists")
        }

        const { insertedId } = await MongoClient.db
            .collection("tracks")
            .insertOne(params)

        const createdPack = await MongoClient.db
            .collection<MongoOmit>("tracks")
            .findOne({ _id: insertedId })

        if (!createdPack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Track not created")
        }

        const { _id, ...rest } = createdPack
        return { id: _id.toHexString(), ...rest }
    }
} 