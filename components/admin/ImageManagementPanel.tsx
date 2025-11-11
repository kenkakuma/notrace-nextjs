'use client'

import { useState, useRef } from 'react'
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  Download,
  ExternalLink
} from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)

    // TODO: Cloudinary アップロード実装
    // 現在はモックデータ
    setTimeout(() => {
      setUploading(false)
    }, 2000)
  }

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

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

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />

          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-lg font-semibold text-text-dark mb-2">
            画像をアップロード
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            ドラッグ&ドロップまたはクリックしてファイルを選択
          </p>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'アップロード中...' : 'ファイルを選択'}
          </button>

          <p className="text-xs text-text-secondary mt-4">
            対応形式: JPG, PNG, GIF, SVG (最大10MB)
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
            {images.length}
          </div>
          <div className="text-sm text-text-secondary">
            総画像数
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary mb-1">
            --
          </div>
          <div className="text-sm text-text-secondary">
            総容量
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary mb-1">
            --
          </div>
          <div className="text-sm text-text-secondary">
            今月のアップロード
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary mb-1">
            --
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

        {images.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-text-dark mb-2">
              画像がありません
            </h4>
            <p className="text-text-secondary mb-6">
              最初の画像をアップロードしましょう
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              画像をアップロード
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
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
