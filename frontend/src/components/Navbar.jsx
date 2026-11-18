import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, logout, isAdmin, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  // Scroll effect for sticky navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(255, 249, 255, 0.94)' : 'rgba(255, 249, 255, 0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border-subtle)',
          boxShadow: isScrolled ? '0 4px 20px rgba(86, 54, 111, 0.08)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Top Announcement Bar */}
        <div
          style={{
            backgroundColor: 'var(--color-dark)',
            color: 'var(--color-primary-light)',
            fontSize: '0.78rem',
            textAlign: 'center',
            padding: '0.4rem 1rem',
            letterSpacing: '0.04em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            fontWeight: 500
          }}
        >
          <span>✨ Spring Lavender Collection • Free Luxury Shipping on orders over $100 • Code: <strong>LAVENDER15</strong> for 15% OFF</span>
        </div>

        <div className="luxury-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none'
            }}
          >
            <img
              src="/logo.png"
              alt="StyleAura Logo"
              style={{
                width: '57px',
                height: '57px',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
              onError={(e) => {
                // graceful fallback if logo fails
                e.target.style.display = 'none';
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: 'var(--color-dark)',
                  lineHeight: 1.1
                }}
              >
                Style<span style={{ color: 'var(--color-accent)' }}>Aura</span>
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  color: 'var(--color-text-muted)',
                  fontWeight: 600
                }}
              >
                Fashion Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.2rem'
            }}
            className="desktop-nav"
          >
            {[
              { to: '/', label: 'Home' },
              { to: '/shop', label: 'Shop' },
              { to: '/categories', label: 'Categories' },
              { to: '/wishlist', label: 'Wishlist' }
            ].map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-dark)' : 'var(--color-text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.94rem',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color 0.2s ease',
                  borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent'
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-dark)',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Search size={21} strokeWidth={2.1} />
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              style={{
                position: 'relative',
                color: 'var(--color-dark)',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Heart size={21} strokeWidth={2.1} />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    backgroundColor: 'var(--color-accent)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(128, 96, 168, 0.4)'
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              style={{
                position: 'relative',
                color: 'var(--color-dark)',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ShoppingBag size={21} strokeWidth={2.1} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    backgroundColor: 'var(--color-dark)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(86, 54, 111, 0.4)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login Dropdown */}
            <div style={{ position: 'relative' }}>
              {currentUser ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'none',
                    border: '1.5px solid var(--color-secondary)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.28rem 0.65rem 0.28rem 0.35rem',
                    cursor: 'pointer',
                    backgroundColor: 'var(--color-primary-light)'
                  }}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--color-dark)',
                      maxWidth: '85px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} color="var(--color-dark)" />
                </button>
              ) : (
                <Link
                  to="/login"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--color-dark)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    padding: '0.5rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--color-secondary)'
                  }}
                >
                  <User size={18} />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Dropdown Menu */}
              {userDropdownOpen && currentUser && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '115%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border)',
                    width: '230px',
                    padding: '0.6rem 0',
                    zIndex: 1001,
                    animation: 'fadeIn 0.2s ease'
                  }}
                >
                  <div style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--color-neutral-light)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--color-dark)', fontSize: '0.9rem', marginBottom: 2 }}>{currentUser.name}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{currentUser.email}</p>
                    <div style={{ marginTop: '0.4rem', display: 'inline-block' }}>
                      <span className="luxury-badge badge-new">
                        VIP Client
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.65rem 1rem',
                      color: 'var(--color-text-main)',
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <User size={16} color="var(--color-accent)" />
                    <span>My Profile & Orders</span>
                  </Link>

                  <div style={{ borderTop: '1px solid var(--color-neutral-light)', paddingTop: '0.3rem' }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.65rem 1rem',
                        color: 'var(--color-danger)',
                        fontSize: '0.88rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFEBEE'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-dark)',
                padding: '0.4rem'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--color-border)',
              padding: '1.2rem 1.5rem 1.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-dark)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '1.05rem',
                textDecoration: 'none',
                padding: '0.4rem 0'
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-dark)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '1.05rem',
                textDecoration: 'none',
                padding: '0.4rem 0'
              })}
            >
              Shop
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-dark)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '1.05rem',
                textDecoration: 'none',
                padding: '0.4rem 0'
              })}
            >
              Categories
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-dark)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '1.05rem',
                textDecoration: 'none',
                padding: '0.4rem 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              })}
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && <span className="luxury-badge badge-trending">{wishlistCount} items</span>}
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-dark)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '1.05rem',
                textDecoration: 'none',
                padding: '0.4rem 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              })}
            >
              <span>Cart</span>
              {cartCount > 0 && <span className="luxury-badge badge-new">{cartCount} items</span>}
            </NavLink>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              {currentUser ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{currentUser.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{currentUser.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-luxury-outline"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-luxury-primary"
                  style={{ width: '100%' }}
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay Modal */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Responsive CSS for Navbar */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
        @media (max-width: 859px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
