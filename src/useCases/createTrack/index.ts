import { MongoCreateTrackRepository } from "../../repository/MongoCreateTrackRepository"
import { CreateTrackController } from "./CreateTrackController"
import { CreateTrackUseCase } from "./CreateTrackUseCase"

const repository = new MongoCreateTrackRepository()
const createTrackUseCase = new CreateTrackUseCase(repository)
const createTrackController = new CreateTrackController(createTrackUseCase)

export { createTrackUseCase, createTrackController }
