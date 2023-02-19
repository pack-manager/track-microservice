import { IUpdateTrackRepository } from "../../repository/protocol/IUpdateTrackRepository";
import { DateHelper } from "../../shared/helper/DateHelper";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { IUpdateTrackRequestDTO } from "./IUpdateTrackRequestDTO";

export class UpdateTrackUseCase implements IUseCase {
    constructor(
        private readonly repository: IUpdateTrackRepository
    ) { }

    async execute({ packCode, events }: IUpdateTrackRequestDTO): Promise<unknown> {
        try {
            const lastUpdateDate = new DateHelper().getDate()
            const lastUpdateTime = new DateHelper().getTime()
            const pack = await this.repository.update(packCode, { events, lastUpdateDate, lastUpdateTime })
            return pack
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}