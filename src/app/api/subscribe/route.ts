import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Initialize the Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, country, dialingCode, mobile } = body

    // Validate required fields
    if (!fullName || !email || !country) {
      return NextResponse.json(
        { error: 'Please provide your full name and email address' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const range = 'Contacts!A:E' // Timestamp, Full Name, Country, Email, Phone

    // Add timestamp
    const timestamp = new Date().toISOString()

    // Combine dialing code and mobile for the phone column
    let phone = ''
    if (typeof dialingCode === 'string' && typeof mobile === 'string') {
      phone = `${dialingCode.trim()} ${mobile.trim()}`.trim()
    } else if (typeof mobile === 'string') {
      phone = mobile.trim()
    }
    
    // Prevent Google Sheets formula injection
    if (phone.startsWith('=') || phone.startsWith('+') || phone.startsWith('-') || phone.startsWith('@')) {
      phone = `'${phone}`
    }

    console.log('Received:', { dialingCode, mobile })
    console.log('Combined phone:', phone)

    // Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, fullName, country, email, phone]],
      },
    })

    return NextResponse.json(
      { message: "Thanks for subscribing. We'll be sure to keep you up to date on all the dankness we have coming up!" },
      { status: 200 }
    )

  } catch (error) {
    console.error('Subscription error:', error)
    let message = 'There was an error subscribing to the newsletter.'
    if (error instanceof Error) {
      message = error.message
    }
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
} 