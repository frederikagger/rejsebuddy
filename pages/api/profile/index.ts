import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'
import bcrypt from 'bcryptjs'

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

  
}