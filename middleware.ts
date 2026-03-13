import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Ambil kode negara dari Vercel
  const country = req.geo?.country || 'US'; 
  
  // 2. Ambil parameter dari link
  const urlParams = req.nextUrl.searchParams;
  let linkIndo = urlParams.get('indo');
  let linkLuar = urlParams.get('luar');
  
  // Fitur link super pendek (tanpa base64, cukup ID saja)
  const shopeeId = urlParams.get('i');
  const shopeeRef = urlParams.get('r');
  const amazonId = urlParams.get('a'); // opsional
  
  if (shopeeId) {
    // Bangkitkan link Shopee otomatis
    linkIndo = `https://s.shopee.co.id/${shopeeId}`;
    if (shopeeRef) {
      linkIndo += `?ref=${shopeeRef}`;
    }
    // Bangkitkan link Amazon otomatis (default ke 3PaxgH6 kalau ga diisi)
    linkLuar = `https://amzn.to/${amazonId || '3PaxgH6'}`;
  }

  // Jika asal Indonesia dan ada link Indo → langsung redirect (server-side)
  if (country === 'ID' && linkIndo) {
    return NextResponse.redirect(linkIndo);
  } 

  // Jika dari Luar Negeri dan ada link Luar
  if (linkLuar) {
    return NextResponse.redirect(linkLuar);
  }

  // Jika diklik tapi tidak ada parameter (misal test), biarkan lanjut ke halaman utama
  return NextResponse.next();
}

// Tentukan route mana saja yang pakai middleware ini
export const config = {
  matcher: '/go', 
};
