import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleQuickDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@styleaura.com');
      setPassword('admin123');
    } else {
      setEmail('aria@styleaura.com');
      setPassword('user123');
    }
    setErrorMessage('');
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: 'var(--color-bg)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2.2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1.5px solid var(--color-secondary)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              border: '1px solid var(--color-secondary)'
            }}
          >
            <Sparkles size={24} color="var(--color-accent)" />
          </div>
          <h1 style={{ fontSize: '1.9rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Access your curated fashion bag, wishlist and couture order history.
          </p>
        </div>

        {/* Demo Fast Fill Button */}
        <div style={{ backgroundColor: 'var(--color-bg)', padding: '0.8rem', borderRadius: 'var(--radius-md)', marginBottom: '1.6rem', border: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => handleQuickDemo('user')}
            style={{
              width: '100%',
              padding: '0.5rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-secondary)',
              backgroundColor: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--color-dark)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <UserCheck size={15} color="var(--color-accent)" />
            <span>Fast Fill Demo Account (Aria Montgomery)</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: '#FFEBEE',
              color: 'var(--color-danger)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.86rem',
              marginBottom: '1.4rem',
              border: '1px solid #FFCDD2'
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="luxury-input-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aria@styleaura.com"
                className="luxury-input"
                style={{ paddingLeft: '2.8rem' }}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="luxury-input-group" style={{ marginBottom: '1.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Password</label>
              <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>
                Forgot Password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="luxury-input"
                style={{ paddingLeft: '2.8rem', paddingRight: '2.8rem' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-light)'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-luxury-primary"
            style={{ width: '100%', padding: '0.9rem', fontSize: '0.98rem' }}
            disabled={loading}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Boutique'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Switch to Signup */}
        <div style={{ textAlign: 'center', marginTop: '1.8rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-neutral-light)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            New to StyleAura?{' '}
            <Link to="/signup" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
