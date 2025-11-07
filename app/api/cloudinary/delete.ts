import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

/**
 * DELETE /api/cloudinary/delete
 * 删除Cloudinary中的图片
 *
 * 请求体：
 * {
 *   "publicId": "image-public-id"
 * }
 */
export async function DELETE(request: NextRequest) {
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

    // 删除图片
    const result = await cloudinary.uploader.destroy(publicId)

    return NextResponse.json({
      success: result.result === 'ok',
      message: `Image ${publicId} deleted successfully`,
    })
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
