import { MongoUpdateTrackRepository } from "../../repository/MongoUpdateTrackRepository"
import { UpdateTrackController } from "./UpdateTrackController"
import { UpdateTrackUseCase } from "./UpdateTrackUseCase"

const repository = new MongoUpdateTrackRepository()
const updateTrackUseCase = new UpdateTrackUseCase(repository)
const updateTrackController = new UpdateTrackController(updateTrackUseCase)

export { updateTrackUseCase, updateTrackController }