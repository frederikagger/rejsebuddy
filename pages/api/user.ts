import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let { birthday, ...user } = req.body
        birthday = new Date(birthday)
        const createUser = await prisma.user.create({
            data: {
                birthday,
                ...user
            }
        })
        return res.send(createUser)
    }
}