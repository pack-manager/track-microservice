import { ITrack } from "../../domain/model/ITrack";

export type MongoOmit = Omit<ITrack, "id">