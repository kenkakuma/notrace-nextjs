'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  Download,
  ExternalLink,
  Loader,
  RefreshCw
} from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

// Cloudinary Upload Widget types
declare global {
  interface Window {
    cloudinary?: any
  }
}

interface CloudinaryImage {
  id: string
  url: string
  publicId: string
  format: string
  width: number
  height: number
  bytes: number
  createdAt: string
}

export function ImageManagementPanel() {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load images on mount
  useEffect(() => {
    fetchImages()
    loadCloudinaryWidget()
  }, [])

  const loadCloudinaryWidget = () => {
    // Cloudinary Upload Widgetスクリプトを動的に読み込む
    if (typeof window !== 'undefined' && !window.cloudinary) {
      const script = document.createElement('script')
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.async = true
      document.body.appendChild(script)
    }
  }

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cloudinary/list?max_results=100')
      const data = await response.json()

      if (data.images) {
        setImages(data.images)
      }
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloudinaryUpload = async () => {
    if (typeof window === 'undefined' || !window.cloudinary) {
      alert('Cloudinary Upload Widgetが読み込まれていません')
      return
    }

    setUploading(true)

    try {
      // アップロード署名を取得
      const signatureResponse = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'notrace', tags: ['admin'] }),
      })
      const signatureData = await signatureResponse.json()

      // Cloudinary Upload Widgetを開く
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: signatureData.cloudName,
          apiKey: signatureData.apiKey,
          uploadSignature: signatureData.signature,
          uploadSignatureTimestamp: signatureData.timestamp,
          folder: signatureData.folder,
          tags: signatureData.tags,
          maxFiles: 10,
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
          maxFileSize: 10000000, // 10MB
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload successful:', result.info)
          }
          if (result.event === 'close') {
            setUploading(false)
            // Widgetを閉じた後、画像リストを更新
            fetchImages()
          }
        }
      )

      widget.open()
    } catch (error) {
      console.error('Upload failed:', error)
      setUploading(false)
      alert('アップロードに失敗しました')
    }
  }

  const handleFileUpload = handleCloudinaryUpload

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (publicId: string) => {
    if (!confirm('この画像を削除しますか？')) return

    try {
      const response = await fetch('/api/cloudinary/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      })

      const data = await response.json()

      if (data.success) {
        // Remove from local state
        setImages(images.filter(img => img.publicId !== publicId))
      } else {
        alert('削除に失敗しました')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      alert('削除に失敗しました')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const filteredImages = images.filter(img =>
    img.publicId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-dark mb-2">
              画像管理
            </h2>
            <p className="text-text-secondary">
              Cloudinaryで画像をアップロード・管理できます
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchImages}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              更新
            </button>
            <a
              href={`https://cloudinary.com/console/c-${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud'}/media_library`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Cloudinaryで開く
            </a>
          </div>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            {uploading ? (
              <Loader className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-primary" />
            )}
          </div>

          <h3 className="text-lg font-semibold text-text-dark mb-2">
            画像をアップロード
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Cloudinary Upload Widgetで画像をアップロード
          </p>

          <button
            onClick={handleCloudinaryUpload}
            disabled={uploading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                アップロード中...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                画像をアップロード
              </>
            )}
          </button>

          <p className="text-xs text-text-secondary mt-4">
            対応形式: JPG, PNG, GIF, SVG, WebP (最大10MB)
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="画像を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            フィルター
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary mb-1">
            {loading ? <Loader className="w-6 h-6 animate-spin" /> : images.length}
          </div>
          <div className="text-sm text-text-secondary">
            総画像数
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary mb-1">
            {loading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              formatFileSize(images.reduce((acc, img) => acc + img.bytes, 0))
            )}
          </div>
          <div className="text-sm text-text-secondary">
            総容量
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary mb-1">
            {loading ? <Loader className="w-6 h-6 animate-spin" /> : filteredImages.length}
          </div>
          <div className="text-sm text-text-secondary">
            表示中
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary mb-1">
            100%
          </div>
          <div className="text-sm text-text-secondary">
            最適化済み
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-text-dark mb-6">
          画像ライブラリ
        </h3>

        {loading ? (
          <div className="text-center py-16">
            <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-text-secondary">読み込み中...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-text-dark mb-2">
              {images.length === 0 ? '画像がありません' : '検索結果がありません'}
            </h4>
            <p className="text-text-secondary mb-6">
              {images.length === 0
                ? '最初の画像をアップロードしましょう'
                : '検索条件を変更してください'}
            </p>
            {images.length === 0 && (
              <button
                onClick={handleCloudinaryUpload}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                画像をアップロード
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-all"
              >
                <OptimizedImage
                  src={image.url}
                  alt={image.publicId}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                  <div className="text-white text-center text-xs mb-2">
                    <div className="font-medium mb-1">{image.format.toUpperCase()}</div>
                    <div>{image.width} x {image.height}</div>
                    <div>{formatFileSize(image.bytes)}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(image.url, image.id)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="URLをコピー"
                    >
                      {copiedId === image.id ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <a
                      href={image.url}
                      download
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="ダウンロード"
                    >
                      <Download className="w-4 h-4 text-white" />
                    </a>
                    <button
                      onClick={() => handleDelete(image.publicId)}
                      className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                      title="削除"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cloudinary Widget Integration Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-text-dark mb-2">
          📌 Cloudinary連携について
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          本番環境では、Cloudinary Upload Widgetを使用して画像をアップロードできます。
          開発環境では、Cloudinaryコンソールから直接管理することを推奨します。
        </p>
        <div className="flex gap-3">
          <a
            href="https://cloudinary.com/documentation/upload_widget"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Upload Widget ドキュメント →
          </a>
          <a
            href="https://cloudinary.com/documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Cloudinary ドキュメント →
          </a>
        </div>
      </div>
    </div>
  )
}
