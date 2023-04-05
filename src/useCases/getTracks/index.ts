import { MongoGetTracksRepository } from "../../repository/MongoGetTracksRepository"
import { GetTracksFromUserController } from "./GetTracksFromUserController"
import { GetTracksFromUserUseCase } from "./GetTracksFromUserUseCase"

const repository = new MongoGetTracksRepository()
const getTracksFromUserUseCase = new GetTracksFromUserUseCase(repository)
const getTracksFromUserController = new GetTracksFromUserController(getTracksFromUserUseCase)

export { getTracksFromUserUseCase, getTracksFromUserController }