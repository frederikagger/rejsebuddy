import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { User } from '.prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies
    if (!token) res.status(401).send({ message: 'No JWT token' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { user } = decoded as { user: User }
    if (!user) res.status(401).send({ message: 'JWT not valid' })
    return user
}