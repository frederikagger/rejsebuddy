import sharp from 'sharp'

const resizeImage: (image: Buffer, width?: number, height?: number) => Promise<Buffer> = async (file, width, height) => {
    const buffer = await sharp(file)
        .resize({ width, height })
        .webp()
        .toBuffer()
    return buffer
}

export default resizeImage
