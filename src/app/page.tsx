'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    dialingCode: '+27',
    mobile: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const dial = selectedOption.getAttribute('data-dial') || ''
    setFormData(prev => ({ 
      ...prev, 
      country: e.target.value, 
      dialingCode: dial 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !firstName || !lastName || !formData.country || !formData.mobile || !formData.dialingCode) {
      setMessage({ text: 'Please fill in all fields.', type: 'error' })
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: `${firstName} ${lastName}`,
          email: formData.email,
          country: formData.country,
          mobile: formData.mobile,
          dialingCode: formData.dialingCode
        }),
      })

      if (response.ok) {
        setMessage({ text: 'Successfully joined the waitlist!', type: 'success' })
        setFormData({
          fullName: '',
          email: '',
          country: '',
          dialingCode: '+27',
          mobile: ''
        })
        setFirstName('')
        setLastName('')
      } else {
        const errorData = await response.json()
        setMessage({ text: errorData.message || 'Failed to join waitlist.', type: 'error' })
      }
    } catch (error) {
      setMessage({ text: 'An error occurred. Please try again later.', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header" role="banner">
        <div className="container header-content">
          <div className="logo">
            <Image
              src="/logo-placeholder.webp" 
              alt="Psycadd Studio Logo" 
              width={40} 
              height={40}
              priority
            />
            <span>Psycadd Studio</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" role="banner" aria-label="Hero Banner">
        <div className="mobile-hero-image">
          <Image
            src="/banner-mobile.webp" 
            alt="Psycadd Studio Hero Banner - Immersive Card Games" 
            className="hero-bg"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 0vw"
          />
        </div>
        <div className="desktop-hero-image">
          <Image
            src="/hero-bg-placeholder.webp" 
            alt="Psycadd Studio Hero Banner - Immersive Card Games" 
            className="hero-bg"
            fill
            priority
            sizes="(min-width: 769px) 100vw, 0vw"
          />
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Email Notification Section */}
      <section className="notify-section" aria-labelledby="signup-heading">
        <div className="container">
          <div className="signup-card">
            <div className="signup-content">
              <div className="signup-image">
                <Image
                  src="/box-concept-1.webp"
                  alt="Smoke & Toke and Snuff & Puff Game Concept Art"
                  width={300}
                  height={225}
                  className="concept-image"
                />
              </div>
              <h3 id="signup-heading">Join the crew</h3>
              <p className="signup-description">
                Be the first to experience Smoke & Toke and Snuff & Puff.<br />
                Join the waiting list for these immersive card games to launch on Kickstarter.
              </p>
              <form className="signup-form" onSubmit={handleSubmit} aria-label="Kickstarter Launch List Signup">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-label="First Name"
                    aria-describedby="name-required"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    aria-label="Last Name"
                    aria-describedby="name-required"
                  />
                </div>
                <div className="form-row">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    aria-label="Email Address"
                    aria-describedby="email-required"
                  />
                  <select
                    value={formData.country}
                    onChange={handleCountryChange}
                    required
                    aria-label="Country"
                    aria-describedby="country-required"
                  >
                    <option value="" disabled>Country</option>
                    <option value="ZA" data-dial="+27">South Africa</option>
                    <option value="US" data-dial="+1">United States</option>
                    <option value="GB" data-dial="+44">United Kingdom</option>
                    <option value="IN" data-dial="+91">India</option>
                    <option value="AU" data-dial="+61">Australia</option>
                    <option value="CA" data-dial="+1">Canada</option>
                    <option value="DE" data-dial="+49">Germany</option>
                    <option value="FR" data-dial="+33">France</option>
                    <option value="BR" data-dial="+55">Brazil</option>
                    <option value="">Other</option>
                  </select>
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="+27"
                    value={formData.dialingCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, dialingCode: e.target.value }))}
                    required
                    aria-label="Country Dialing Code"
                    aria-describedby="phone-required"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    required
                    aria-label="Mobile Number"
                    aria-describedby="phone-required"
                  />
                </div>
                <div className="form-submit-area">
                  <button type="submit" disabled={isSubmitting} aria-describedby="submit-status">
                    {isSubmitting ? 'Joining...' : 'Join Kickstarter Launch List'}
                  </button>
                  <div 
                    className={`form-message ${message.type} ${message.text ? 'visible' : ''}`}
                    id="submit-status"
                    role="alert"
                    aria-live="polite"
                  >
                    {message.text}
                  </div>
                </div>
                <small>We respect your privacy. Unsubscribe at any time.</small>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Game Collection */}
      <section className="games" id="games" aria-labelledby="games-heading">
        <h2 id="games-heading" className="sr-only">Our Games</h2>
        <article className="game-fullscreen">
          <picture>
            <source media="(max-width: 768px)" srcSet="/game1-mobile.webp" />
            <Image
              src="/game1-placeholder.webp"
              alt="Smoke & Toke Card Game - High-stakes cannabis-fueled strategy game"
              width={1920}
              height={1080}
              className="game-fullscreen-image"
              priority
            />
          </picture>
          <div className="game-details-below">
            <h3>Smoke & Toke</h3>
            <p>
              A high-stakes clash of strategy, luck, and cannabis-fueled chaos where the highest bidder doesn't always win the fight—but the highest player just might.
            </p>
            <div className="feature-text">
              Strain your buds.<br />
              Expand your grow op.<br />
              Smoke your crew before they smoke you.
            </div>
            <div className="tags-wrapper" role="list" aria-label="Game specifications">
              <span role="listitem">30-45 minutes</span>
              <span role="listitem">2-6 players</span>
              <span role="listitem">Ages 18+</span>
              <span role="listitem">Fast paced set-builder</span>
              <span role="listitem">Combinable with Snuff & Puff</span>
            </div>
            <p className="green-text">Coming to Kickstarter in 2025</p>
          </div>
        </article>

        <article className="game-fullscreen dark-theme">
          <picture>
            <source media="(max-width: 768px)" srcSet="/game2-mobile.webp" />
            <Image
              src="/game2-placeholder.webp"
              alt="Snuff & Puff Card Game - Thug life empire building strategy game"
              width={1920}
              height={1080}
              className="game-fullscreen-image"
              priority
            />
          </picture>
          <div className="game-details-below">
            <h3>Snuff & Puff</h3>
            <p>
            A card game for geeks like us who always dreamt of living the thug life, but didn't have the balls to do so.
            </p>
            <div className="feature-text">
              Rob your friends.<br />
              Build your empire.<br />
              Become the Kingpin.
            </div>
            <div className="tags-wrapper" role="list" aria-label="Game specifications">
              <span role="listitem">30-45 minutes</span>
              <span role="listitem">2-6 players</span>
              <span role="listitem">Ages 18+</span>
              <span role="listitem">Fast paced set-builder</span>
              <span role="listitem">Combinable with Smoke & Toke</span>
            </div>
            <p className="green-text">Coming to Kickstarter in 2025</p>
          </div>
        </article>
      </section>

      {/* About Section */}
      <section className="about" id="about" aria-labelledby="about-heading">
        <div className="container">
          <h2 id="about-heading">About Psycadd Studio</h2>
          <p className="text-center">
          We are passionate game designers committed to crafting immersive, strategic card games that bring people together. Pushing the boundaries of traditional game design by exploring themes and concepts rarely seen in the tabletop world.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <h3>Quality Design</h3>
              <p>Our games are crafted with striking, immersive artworks that draw players into their worlds. From meticulous illustrations to thoughtfully designed layouts, ensuring a blance between aesthetic brilliance and engaging gameplay.</p>
            </div>
            <div className="about-feature">
              <h3>Unforgettable Experiences</h3>
              <p>We craft games that immerse players in unique, thought-provoking worlds, blending strategy with storytelling to create memorable moments that linger long after the cards are played.</p>
            </div>
            <div className="about-feature">
              <h3>Looking Ahead</h3>
              <p>With exciting projects in the pipeline, we're constantly exploring fresh themes and innovative mechanics that keep gameplay engaging and dynamic. Our future releases promise new experiences that keep the table alive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spread the Word */}
      <section className="spread-word" aria-labelledby="social-heading">
        <div className="container">
          <h2 id="social-heading">Spread the Word</h2>
          <p>Help us build our community by sharing with fellow gamers and good buds.</p>
          <div className="social-icons" role="list" aria-label="Social media links">
            <a href="https://www.reddit.com/user/psycadd_studio/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Reddit" role="listitem">
              <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
            </a>
            <a href="https://web.facebook.com/profile.php?id=61567809602323" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" role="listitem">
              <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/psycadd.studio/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" role="listitem">
              <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact" aria-labelledby="contact-heading">
        <div className="container">
          <h2 id="contact-heading">Get In Touch</h2>
          <p>Have questions about our games or want to collaborate? We'd love to hear from you.</p>
          <div className="contact-email">
            <a href="mailto:games@psycadd.studio" aria-label="Email us at games@psycadd.studio">
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container footer-content">
          <div className="footer-brand">
            <Image 
              src="/bottom-logo.png" 
              alt="Psycadd Studio Logo" 
              width={250} 
              height={250}
            />
            <p>&copy; 2025 Psycadd Studio. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 