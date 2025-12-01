import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_PATH } from '../routes';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  if (PUBLIC_PATH.includes(pathname)) {
    return handlePublicPath(request, pathname, token);
  }

  if (pathname === '/unauthorized') {
    return NextResponse.next();
  }

  // Authentication check
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userId = await getUserFromSession(token);
  if (!userId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

async function handlePublicPath(
  request: NextRequest,
  pathname: string,
  token?: string
) {
  if (
    token &&
    (pathname === '/login' || pathname === '/register' || pathname === '/')
  ) {
    const userId = await getUserFromSession(token);
    if (userId) {
      return NextResponse.redirect(new URL('/urls', request.url));
    }
  }
  return NextResponse.next();
}

async function getUserFromSession(token: string): Promise<string | null> {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded?.id || null;
  } catch {
    return null;
  }
}
