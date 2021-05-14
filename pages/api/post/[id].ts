import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }, include: {
                author: {
                    select: {
                        firstname: true, lastname: true, avatar: true
                    }
                }, destinations: {
                    select: {
                        name: true, id: true
                    }
                }
            }
        })
        return res.send(post)
    }
}