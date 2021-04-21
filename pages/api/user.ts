import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let { birthday, password, ...user } = req.body
        birthday = new Date(birthday)
        password = await bcrypt.hash(password, 10)
        const createUser = await prisma.user.create({
            data: {
                birthday,
                password,
                ...user
            }
        })
        return res.status(201).send(createUser)
    }

    if (req.method === 'GET') {
        const { token } = req.cookies
        if (!token) return res.status(400).send({ data: 'Error!' })
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) return res.status(401).send({ data: 'Bad token' })
            return res.status(200).send(decoded)
        })
    }
}