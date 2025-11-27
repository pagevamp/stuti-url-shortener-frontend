'use server';
import { cookies } from 'next/headers';

export async function getCookie() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')

  return accessToken;
}
