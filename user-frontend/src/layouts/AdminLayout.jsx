import React from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  FolderTree, 
  ArrowLeft, 
  ShieldCheck, 
  LogOut,
  Sparkles,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { currentUser, isAdmin, switchDemoRole, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-bg)',
          padding: '2rem'
        }}
      >
        <div
          style={{
            maxWidth: '460px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: '1.5px solid var(--color-secondary)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem'
            }}
          >
            <ShieldCheck size={32} />
          </div>

          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-dark)', marginBottom: '0.6rem' }}>
            Admin Access Required
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.6rem', lineHeight: 1.5 }}>
            The Admin Management Console is restricted to authorized boutique managers. You can activate the demo admin account with one click below.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button
              onClick={() => switchDemoRole('admin')}
              className="btn-luxury-primary"
              style={{ width: '100%' }}
            >
              <Sparkles size={18} />
              <span>Login as Demo Admin (Eleanor Vance)</span>
            </button>

            <Link
              to="/"
              className="btn-luxury-outline"
              style={{ width: '100%' }}
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FDFBFE' }}>
      
      {/* Admin Top Header */}
      <header
        style={{
          backgroundColor: 'var(--color-dark)',
          color: '#FFFFFF',
          padding: '0.85rem 1.8rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(86, 54, 111, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <Link
            to="/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#FFFFFF',
              textDecoration: 'none'
            }}
          >
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700 }}>
              Style<span style={{ color: 'var(--color-secondary)' }}>Aura</span>
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                backgroundColor: 'rgba(197, 165, 232, 0.25)',
                color: 'var(--color-primary-light)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                letterSpacing: '0.04em'
              }}
            >
              ADMIN PORTAL
            </span>
          </Link>

          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-secondary)',
              fontSize: '0.84rem',
              fontWeight: 500,
              textDecoration: 'none',
              marginLeft: '0.8rem'
            }}
          >
            <ArrowLeft size={15} />
            <span>View Live Storefront</span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-secondary)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>{currentUser.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)' }}>Store Director</span>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            style={{
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-full)',
              color: '#FFFFFF',
              padding: '0.35rem 0.8rem',
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body with Content */}
      <div style={{ flex: 1, padding: '2rem 1.8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        <Outlet />
      </div>
    </div>
  );
}
