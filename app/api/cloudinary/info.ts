import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

/**
 * POST /api/cloudinary/info
 * 获取Cloudinary资源信息
 *
 * 请求体：
 * {
 *   "publicId": "image-public-id"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 验证API密钥
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    if (!apiKey || !apiSecret || !cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary configuration is incomplete' },
        { status: 500 }
      )
    }

    // 配置Cloudinary
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    })

    const body = await request.json()
    const { publicId } = body

    if (!publicId) {
      return NextResponse.json(
        { error: 'publicId is required' },
        { status: 400 }
      )
    }

    // 获取资源信息
    const resource = await cloudinary.api.resource(publicId)

    return NextResponse.json({
      publicId: resource.public_id,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      bytes: resource.bytes,
      createdAt: resource.created_at,
      url: resource.url,
      secureUrl: resource.secure_url,
    })
  } catch (error) {
    console.error('Error fetching resource info from Cloudinary:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resource info' },
      { status: 500 }
    )
  }
}
