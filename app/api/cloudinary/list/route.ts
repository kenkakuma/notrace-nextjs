import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

/**
 * GET /api/cloudinary/list
 * Cloudinaryから画像リストを取得
 *
 * Query parameters:
 * - folder: フォルダ名 (オプション)
 * - max_results: 最大取得数 (デフォルト: 50)
 */
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder') || ''
    const maxResults = parseInt(searchParams.get('max_results') || '50', 10)

    // 获取资源列表
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: maxResults,
      resource_type: 'image',
    })

    // 转换为统一格式
    const images = result.resources.map((resource: any) => ({
      id: resource.asset_id,
      publicId: resource.public_id,
      url: resource.secure_url,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      bytes: resource.bytes,
      createdAt: resource.created_at,
    }))

    return NextResponse.json({
      images,
      total: result.total_count,
      nextCursor: result.next_cursor,
    })
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}
