import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

const spaceboy = localFont({
  src: '../fonts/spaceboy.TTF',
  variable: '--font-spaceboy',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Psycadd Studio – Immersive Card Games | Smoke & Toke | Snuff & Puff',
  description: 'Join Psycadd Studio\'s Kickstarter launch list for Smoke & Toke and Snuff & Puff - immersive, strategic card games with unforgettable experiences. Be the first to experience these unique tabletop games.',
  keywords: 'card games, tabletop games, Kickstarter, Smoke & Toke, Snuff & Puff, Psycadd Studio, strategic games, immersive games, board games, card game launch',
  authors: [{ name: 'Psycadd Studio' }],
  creator: 'Psycadd Studio',
  publisher: 'Psycadd Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://psycaddstudio.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Psycadd Studio – Immersive Card Games | Smoke & Toke | Snuff & Puff',
    description: 'Join Psycadd Studio\'s Kickstarter launch list for Smoke & Toke and Snuff & Puff - immersive, strategic card games with unforgettable experiences.',
    url: 'https://psycaddstudio.com',
    siteName: 'Psycadd Studio',
    images: [
      {
        url: '/logo-placeholder.webp',
        width: 1200,
        height: 630,
        alt: 'Psycadd Studio - Immersive Card Games',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psycadd Studio – Immersive Card Games | Smoke & Toke | Snuff & Puff',
    description: 'Join Psycadd Studio\'s Kickstarter launch list for Smoke & Toke and Snuff & Puff - immersive, strategic card games.',
    images: ['/logo-placeholder.webp'],
    creator: '@psycadd_studio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  themeColor: '#000000',
  other: {
    'msapplication-TileColor': '#000000',
  },
  viewport: 'width=device-width, initial-scale=1.0'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${spaceboy.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Psycadd Studio",
              "url": "https://psycaddstudio.com",
              "logo": "https://psycaddstudio.com/logo-placeholder.webp",
              "description": "Psycadd Studio creates immersive, strategic card games with unforgettable experiences.",
              "sameAs": [
                "https://www.instagram.com/psycadd.studio/",
                "https://web.facebook.com/profile.php?id=61567809602323",
                "https://www.reddit.com/user/psycadd_studio/"
              ],
              "foundingDate": "2024",
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Card Games",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Smoke & Toke",
                      "description": "An immersive strategic card game"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Snuff & Puff",
                      "description": "An immersive strategic card game"
                    }
                  }
                ]
              }
            })
          }}
          id="json-ld"
        />
        {children}
      </body>
    </html>
  )
} 