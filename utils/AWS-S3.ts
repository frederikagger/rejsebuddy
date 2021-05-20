import S3 from 'aws-sdk/clients/s3';

const S3client = new S3({
    apiVersion: "2006-03-01",
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const uploadS3: (image: Buffer, userId: string) => Promise<string> = async (image, userId) => {
    const now = Date.now()
    const name = userId + now + '.webp'
    await S3client.putObject({
        Key: name,
        Bucket: process.env.AWS_BUCKET_NAME,
        ContentType: 'image/webp',
        Body: image,
        ACL: 'public-read'
    }).promise()
    return name
}

export {
    uploadS3
}
