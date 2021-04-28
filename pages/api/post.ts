import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'
import { Post, User } from '.prisma/client'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let { destinations, startDate, endDate, travelTypes, transportTypes, title, description } = req.body
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        const { token } = req.cookies
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { user } = decoded as { user: User }

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
            prisma.$disconnect()
            return res.send(createdPost)
        }
    }
}