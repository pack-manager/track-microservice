import { ITrack } from "../../domain/model/ITrack";
import { ICreateTrackRepository } from "../../repository/protocol/ICreateTrackRepository";
import { AppError } from "../../shared/error/AppError";
import { DateHelper } from "../../shared/helper/DateHelper";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ICreateTrackRequestDTO } from "./ICreateTrackRequestDTO";

export class CreateTrackUseCase implements IUseCase {
    constructor(
        private readonly repository: ICreateTrackRepository
    ) { }

    async execute({ packCode, events }: ICreateTrackRequestDTO): Promise<ITrack | AppError> {
        try {
            const lastUpdateDate = new DateHelper().getDate()
            const lastUpdateTime = new DateHelper().getTime()

            return await this.repository.createTrack({ packCode, events, lastUpdateDate, lastUpdateTime })
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}