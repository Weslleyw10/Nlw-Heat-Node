import Prisma from "../prisma"


export class GetLastMessagesService {
    async execute() {
        try {
            const messages = Prisma.message.findMany({
                take: 3,
                orderBy: {
                    created_at: "desc"
                },
                include: {
                    user: true
                }
            })

            return messages


        } catch (error: any) {
            return error.message
        }
    }
    
}