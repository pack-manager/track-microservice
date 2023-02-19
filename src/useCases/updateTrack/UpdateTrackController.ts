import { ITrack } from "../../domain/model/ITrack";
import { UpdateTrackParams } from "../../repository/protocol/IUpdateTrackRepository";
import { AppError } from "../../shared/error/AppError";
import { badRequest, customErrorMessage, ok, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class UpdateTrackController implements IController {
    constructor(
        private readonly updateTrackUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<UpdateTrackParams>): Promise<IHttpResponse<unknown>> {
        try {
            const { packCode } = httpRequest.params
            const { body } = httpRequest

            if (!body) {
                return badRequest("Missing fields")
            }

            if (!packCode) {
                return badRequest("Missing track code")
            }

            const pack = await this.updateTrackUseCase.execute({ packCode, ...body })

            return ok<ITrack>(pack)
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}