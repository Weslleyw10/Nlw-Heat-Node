import { Request, Response } from "express"
import { GetLastMessagesService } from '../services/GetLastMessagesService'

export class GetLastMessagesController {
    async handle(request: Request, response: Response) {
        const messages = new GetLastMessagesService()
        const result = await messages.execute()

        response.json(result)
    }
}