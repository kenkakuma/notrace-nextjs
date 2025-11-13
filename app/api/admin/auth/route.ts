import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/admin/auth
 * 管理者認証API
 *
 * Request body:
 * {
 *   "password": "string"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123' // Default for development

    // Verify password
    if (password === adminPassword) {
      // Create response with success
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
      })

      // Set authentication cookie
      response.cookies.set('admin-auth', adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid password',
        },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Authentication failed',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/auth
 * ログアウトAPI
 */
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })

  // Remove authentication cookie
  response.cookies.delete('admin-auth')

  return response
}
