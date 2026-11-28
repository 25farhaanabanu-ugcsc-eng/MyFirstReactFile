import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard,
  Check,
  Globe,
  Share2,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark)',
        color: 'var(--color-primary-light)',
        paddingTop: '4.5rem',
        paddingBottom: '2rem',
        marginTop: '5rem',
        borderTop: '3px solid var(--color-secondary)'
      }}
    >
      <div className="luxury-container">
        
        {/* Value Propositions Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.8rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(233, 221, 247, 0.15)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(197, 165, 232, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={22} color="var(--color-secondary)" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.98rem', marginBottom: '2px' }}>Complimentary Delivery</h4>
              <p style={{ color: 'var(--color-neutral)', fontSize: '0.82rem', margin: 0 }}>On luxury orders over $100</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(197, 165, 232, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RotateCcw size={22} color="var(--color-secondary)" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.98rem', marginBottom: '2px' }}>Effortless 30-Day Returns</h4>
              <p style={{ color: 'var(--color-neutral)', fontSize: '0.82rem', margin: 0 }}>Doorstep pickup & exchanges</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(197, 165, 232, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} color="var(--color-secondary)" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.98rem', marginBottom: '2px' }}>Authentic Craftsmanship</h4>
              <p style={{ color: 'var(--color-neutral)', fontSize: '0.82rem', margin: 0 }}>Handpicked couture materials</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(197, 165, 232, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={22} color="var(--color-secondary)" />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '0.98rem', marginBottom: '2px' }}>Secure Checkout</h4>
              <p style={{ color: 'var(--color-neutral)', fontSize: '0.82rem', margin: 0 }}>256-bit encrypted transactions</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingTop: '3.5rem',
            paddingBottom: '3.5rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <img
                src="/logo.png"
                alt="StyleAura Logo"
                style={{
                  width: '38px',
                  height: '38px',
                  objectFit: 'contain',
                  borderRadius: '6px'
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFFFFF', fontWeight: 700 }}>
                Style<span style={{ color: 'var(--color-secondary)' }}>Aura</span>
              </span>
            </div>
            <p style={{ color: 'var(--color-neutral)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Curating ethereal silhouettes, soft lavender palettes, and modern high-fashion essentials for discerning wardrobes across the globe.
            </p>
            
            {/* Social & Community Icons */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {[
                { icon: <Globe size={18} />, label: 'Global Boutique' },
                { icon: <Share2 size={18} />, label: 'Share Collection' },
                { icon: <Sparkles size={18} />, label: 'VIP Lounge' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href="#social"
                  aria-label={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 165, 232, 0.15)',
                    color: 'var(--color-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(197, 165, 232, 0.15)';
                    e.currentTarget.style.color = 'var(--color-secondary)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              Boutique
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li><Link to="/shop" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>All Collections</Link></li>
              <li><Link to="/categories" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Featured Categories</Link></li>
              <li><Link to="/shop?sort=newest" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>New Arrivals</Link></li>
              <li><Link to="/shop?sort=popularity" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Best Sellers</Link></li>
              <li><Link to="/wishlist" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li><Link to="/profile" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Track Your Order</Link></li>
              <li><Link to="/cart" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Shipping & Customs</Link></li>
              <li><Link to="/profile" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Returns & Exchanges</Link></li>
              <li><a href="#faq" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Size & Fit Consultant</a></li>
              <li><a href="#privacy" style={{ color: 'var(--color-neutral)', fontSize: '0.88rem' }}>Privacy & Security</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              Join The Style Gazette
            </h4>
            <p style={{ color: 'var(--color-neutral)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              Receive exclusive access to private capsule collections, runway previews, and 15% off your premier order.
            </p>

            <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 3.2rem 0.85rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(197, 165, 232, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '4px',
                  bottom: '4px',
                  width: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>
            {subscribed && (
              <p style={{ color: 'var(--color-secondary)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                ✓ Welcome to StyleAura! Check your inbox for your 15% code.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(233, 221, 247, 0.12)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--color-neutral)'
          }}
        >
          <div>
            © {new Date().getFullYear()} StyleAura Luxury Fashion Store. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#terms" style={{ color: 'var(--color-neutral)' }}>Terms of Service</a>
            <a href="#privacy" style={{ color: 'var(--color-neutral)' }}>Privacy Policy</a>
            <a href="#contact" style={{ color: 'var(--color-neutral)' }}>Contact Concierge</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
