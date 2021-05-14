import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'
import auth from '../../middleware/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        await auth(req, res)
        const posts = await prisma.post.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        firstname: true, lastname: true, avatar: true
                    }
                }
            }
        })
        return res.send(posts)
    }
}