import { Request, Response } from "express"
import { ProfileUserService } from "../services/ProfileUserService"

export class ProfileUserController {
    async handle(request: Request, response: Response) {
        const { user_id } = request

        const user = new ProfileUserService()
        const result = await user.execute(user_id)

        response.json(result)

    }
}