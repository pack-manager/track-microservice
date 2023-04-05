import { ITrack } from "../../domain/model/ITrack";
import { IGetTracksRepository } from "../../repository/protocol/IGetTracksRepository";
import { AppError } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class GetTracksFromUserUseCase implements IUseCase {
    constructor(
        private readonly repository: IGetTracksRepository
    ) { }

    async execute(data: string): Promise<ITrack[] | AppError> {
        try {
            return await this.repository.getTracksFromUser(data)
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}