import { Router } from "express"
import { createTrackController } from "../../useCases/createTrack"
import { getTracksFromUserController } from "../../useCases/getTracks"
import { updateTrackController } from "../../useCases/updateTrack"
const routes = Router()

routes.post("/tracks", async (req, res) => {
    const { body, statusCode } = await createTrackController.handle({ body: req.body })
    res.status(statusCode).send(body)
})


routes.get("/tracks/:packCode", async (req, res) => {
    const { body, statusCode } = await getTracksFromUserController.handle({ params: req.params })
    res.status(statusCode).json(body)
})

routes.patch("/tracks/:packCode", async (req, res) => {
    const { body, statusCode } = await updateTrackController.handle({ params: req.params, body: req.body })
    res.status(statusCode).send(body)
})

export default routes