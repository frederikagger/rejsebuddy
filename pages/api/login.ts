import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let { email, password } = req.body
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).send({ data: 'Error!' })
        const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.send({ token })
    }
    return res.status(400).send({ data: 'This endpoint only accepts POST requests' })
}