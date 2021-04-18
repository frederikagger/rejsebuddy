// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
