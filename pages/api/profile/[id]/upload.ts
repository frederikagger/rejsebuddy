import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../../utils/prisma'
import upload from '../../../../utils/upload'
import resizeImage from '../../../../utils/resizeImage'
import { uploadS3 } from '../../../../utils/AWS-S3'

export interface MulterFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
    size: number
}

export interface NextApiRequestExtented extends NextApiRequest {
    file: MulterFile
    avatarPathBig: string | undefined
    avatarPathSmall: string | undefined

}

export default nextConnect<NextApiRequestExtented, NextApiResponse>()
    .use(upload.single('avatar'))
    .use(async (req, _, next) => {
        const { id } = req.query
        const avatarBuffer50x50 = await resizeImage(req.file.buffer, 50, 50)
        const avatarPathSmall = await uploadS3(avatarBuffer50x50, id[0])
        req.avatarPathSmall = avatarPathSmall
        const avatarBuffer500x500 = await resizeImage(req.file.buffer, 500, 500)
        const avatarPathBig = await uploadS3(avatarBuffer500x500, id[0])
        req.avatarPathBig = avatarPathBig
        next()
    }).patch(async (req, res) => {
        const { id } = req.query
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            }, data: {
                avatarBig: req.avatarPathBig,
                avatarSmall: req.avatarPathSmall
            }
        })
        return res.json(user)
    })

export const config = {
    api: {
        bodyParser: false,
    },
}