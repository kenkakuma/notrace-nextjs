/**
 * Cloudinary图片管理和优化工具
 *
 * 使用前需要：
 * 1. 在 https://cloudinary.com 注册账户
 * 2. 获取Cloud Name：https://dashboard.cloudinary.com/settings/general
 * 3. 创建上传预设（Upload Preset）：https://cloudinary.com/console/settings/upload
 * 4. 填写.env.local中的NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 */

interface CloudinaryUploadOptions {
  folder?: string
  tags?: string[]
  publicId?: string
  quality?: 'auto' | 'best' | 'good' | 'eco'
  width?: number
  height?: number
  crop?: 'fill' | 'fit' | 'scale' | 'crop'
}

interface CloudinaryUrl {
  url: string
  secureUrl: string
  publicId: string
}

/**
 * 根据公共ID生成Cloudinary图片URL
 * 支持自动格式转换、质量优化、大小调整等
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number
    height?: number
    quality?: 'auto' | 'best' | 'good' | 'eco'
    crop?: 'fill' | 'fit' | 'scale'
    format?: 'auto' | 'webp' | 'jpg' | 'png'
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not configured')
    return ''
  }

  const params = new URLSearchParams()

  // 图片优化参数
  if (options?.width) params.append('w', options.width.toString())
  if (options?.height) params.append('h', options.height.toString())
  if (options?.crop) params.append('c', options.crop)
  if (options?.quality) params.append('q', options.quality)
  if (options?.format) params.append('f', options.format)

  // 自动格式转换和质量优化
  params.append('f', options?.format || 'auto')
  params.append('q', options?.quality || 'auto')

  const queryString = params.toString()
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/${queryString}/${publicId}`

  return url
}

/**
 * 生成Hero背景图片的优化URL
 * 适配不同设备尺寸，自动格式转换
 */
export function getHeroImageUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 1920,
    height: 1080,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  })
}

/**
 * 生成缩略图URL
 * 用于列表展示、卡片等小图片
 */
export function getThumbnailUrl(publicId: string, size: 'sm' | 'md' | 'lg' = 'md'): string {
  const sizes = {
    sm: { width: 200, height: 200 },
    md: { width: 400, height: 400 },
    lg: { width: 600, height: 600 },
  }

  const sizeConfig = sizes[size]
  return getCloudinaryUrl(publicId, {
    width: sizeConfig.width,
    height: sizeConfig.height,
    crop: 'fill',
    quality: 'good',
    format: 'auto',
  })
}

/**
 * 生成响应式图片的srcset
 * 用于Next.js Image组件的srcSet属性
 */
export function getResponsiveSrcset(publicId: string, sizes: number[] = [640, 1024, 1920]): string {
  return sizes
    .map((size) => {
      const url = getCloudinaryUrl(publicId, {
        width: size,
        crop: 'scale',
        quality: 'auto',
        format: 'auto',
      })
      return `${url} ${size}w`
    })
    .join(', ')
}

/**
 * 上传图片到Cloudinary（客户端）
 * 需要在Cloudinary Dashboard中创建Upload Preset
 */
export async function uploadImageToCloudinary(
  file: File,
  options?: CloudinaryUploadOptions
): Promise<CloudinaryUrl | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    console.error('Cloudinary configuration is incomplete')
    return null
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('cloud_name', cloudName)

  if (options?.folder) {
    formData.append('folder', options.folder)
  }

  if (options?.publicId) {
    formData.append('public_id', options.publicId)
  }

  if (options?.tags) {
    formData.append('tags', options.tags.join(','))
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const data = await response.json()

    return {
      url: data.url,
      secureUrl: data.secure_url,
      publicId: data.public_id,
    }
  } catch (error) {
    console.error('Image upload error:', error)
    return null
  }
}

/**
 * 删除Cloudinary中的图片（服务端）
 * 需要在API路由中调用，使用API_KEY和API_SECRET
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    // 这应该在API路由中调用，而不是直接在客户端
    // 因为需要API_KEY和API_SECRET
    const response = await fetch('/api/cloudinary/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    })

    return response.ok
  } catch (error) {
    console.error('Image deletion error:', error)
    return false
  }
}

/**
 * 获取Cloudinary资源信息
 */
export async function getCloudinaryResourceInfo(publicId: string): Promise<any> {
  try {
    const response = await fetch(`/api/cloudinary/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch resource info')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching resource info:', error)
    return null
  }
}

/**
 * Cloudinary Image Asset类型定义
 */
export interface CloudinaryImage {
  publicId: string
  url: string
  secureUrl: string
  format: string
  width: number
  height: number
  bytes: number
  createdAt: string
  tags: string[]
}
