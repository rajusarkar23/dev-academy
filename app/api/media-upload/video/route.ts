import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";


const s3 = new S3Client({
    region: "auto",
    endpoint: `${process.env.CLOUDFLARE_ENDPOINT}`,
    credentials: {
        accessKeyId: `${process.env.CLOUDFLARE_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.CLOUDFLARE_SECRET_ACCESS_KEY}`
    },
    forcePathStyle: true
})

const CLOUDFLARE_CDN_URI = `${process.env.CLOUDFLARE_CDN_URL}`

export async function POST(req: NextRequest){
    const formData = await req.formData()
    const file = (formData.get("file") as File) || null

    const fileName = file.name.replace(" ", "-").replace(".mkv","")

    const uploadParams = {
        Bucket: `${process.env.CLOUDFLARE_BUCKET_NAME}`,
        Key:fileName,
        Body: Buffer.from (await file.arrayBuffer()),
        ContentType:"video/mp4"
    }

    try {
        const upload = await s3.send(new PutObjectCommand(uploadParams))

        if (upload.$metadata.httpStatusCode === 200) {
            return NextResponse.json({
                success: true,
                message: "Video uploaded successfully",
                videoUrl: `${CLOUDFLARE_CDN_URI}/${fileName}`
                })
        } else {
            return NextResponse.json({
                success: false,
                message: "Unable to upload your video"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        })
    }
    
}