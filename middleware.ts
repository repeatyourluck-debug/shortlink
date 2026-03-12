import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Ambil kode negara dari Vercel
  const country = req.geo?.country || 'US'; 
  
  // 2. Ambil parameter dari link (indo dan luar)
  const urlParams = req.nextUrl.searchParams;
  const linkIndo = urlParams.get('indo');
  const linkLuar = urlParams.get('luar');

  // Jika asal Indonesia dan ada link Indo
  if (country === 'ID' && linkIndo) {
    return NextResponse.redirect(linkIndo);
  } 
  
  // Jika dari Luar Negeri dan ada link Luar
  if (linkLuar) {
    return NextResponse.redirect(linkLuar);
  }

  // Jika diklik tapi tidak ada parameter (misal test), biarkan lanjut ke halaman utama (Page)
  return NextResponse.next();
}

// Tentukan route mana saja yang pakai middleware ini
export const config = {
  matcher: '/go', 
};
