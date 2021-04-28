import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const posts = await prisma.post.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
            include: { author: { select: { firstname: true, lastname: true } } }
        })
        prisma.$disconnect()
        return res.send(posts)
    }
}