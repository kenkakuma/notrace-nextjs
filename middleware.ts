import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for protecting admin routes with simple password authentication
 *
 * Admin routes require a password stored in session
 * Password is set in environment variable: ADMIN_PASSWORD
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Check if authenticated
    const authCookie = request.cookies.get('admin-auth')
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123' // Default password for development

    // If authenticated, allow access
    if (authCookie?.value === adminPassword) {
      return NextResponse.next()
    }

    // Check if it's a login attempt
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Redirect to login page
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
