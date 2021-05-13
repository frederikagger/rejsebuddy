import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'
import auth from '../../../middleware/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const user = await auth(req, res)
        let { destinations, startDate, endDate, travelTypes, transportTypes, title, description } = req.body
        startDate = new Date(startDate)
        endDate = new Date(endDate)

        const createdPost = await prisma.post.create({
            data: {
                description,
                title,
                destinations: { create: { name: destinations } },
                startDate,
                endDate,
                transportTypes: { create: { name: travelTypes } },
                travelTypes: { create: { name: travelTypes } },
                author: { connect: { email: user.email } }
            }
        })
        if (createdPost) {
            return res.send(createdPost)
        }
    }

}