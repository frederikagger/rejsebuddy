import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query
        const user = await prisma.user.findUnique({ where: { id: Number(id) } })
        return res.send(user)
    }

    if (req.method === 'DELETE') {
        const { id } = req.query
        const user = await prisma.user.update({ where: { id: Number(id) }, data: { deleted: true } })
        return res.send(user)
    }

}