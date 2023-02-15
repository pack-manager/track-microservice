import { Router } from "express"
import { createTrackController } from "../../useCases/createTrack"
const routes = Router()

routes.post("/tracks", async (req, res) => {
    const { body, statusCode } = await createTrackController.handle({ body: req.body })
    res.status(statusCode).send(body)
})

export default routes