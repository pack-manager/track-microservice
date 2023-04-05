import { ITrack } from "../../domain/model/ITrack";
import { AppError } from "../../shared/error/AppError";
import { customErrorMessage, ok, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class GetTracksFromUserController implements IController {
    constructor(
        private readonly getTracksFromUserUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<string>): Promise<IHttpResponse<ITrack[] | string>> {
        try {
            const { packCode } = httpRequest.params
            const packs = await this.getTracksFromUserUseCase.execute(packCode)
            return ok<ITrack[]>(packs)
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}