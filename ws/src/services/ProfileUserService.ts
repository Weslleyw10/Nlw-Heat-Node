import Prisma from '../prisma'


export class ProfileUserService {
    async execute(user_id: string) {
        try {            
            const user = await Prisma.user.findFirst ({
                where: {
                    id: user_id,
                }
            })

            return user

        } catch (error: any) {
            return error.message;
        }

    }
}