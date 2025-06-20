import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    hasGoogleClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
    hasGooglePrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    hasGoogleSheetId: !!process.env.GOOGLE_SHEET_ID,
    clientEmailLength: process.env.GOOGLE_CLIENT_EMAIL?.length || 0,
    privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
    sheetIdLength: process.env.GOOGLE_SHEET_ID?.length || 0
  }

  return NextResponse.json({
    message: 'Environment variables check',
    envVars,
    status: 'success'
  })
} 