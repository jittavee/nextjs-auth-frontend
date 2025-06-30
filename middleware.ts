// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // ถ้ายังไม่ login และพยายามเข้าหน้า dashboard ให้ redirect ไปหน้า login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ถ้า login แล้ว และพยายามเข้าหน้า login หรือ register ให้ redirect ไปหน้า dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// ระบุ path ที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};