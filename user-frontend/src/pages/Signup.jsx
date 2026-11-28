import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service to continue.');
      return;
    }

    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);

    if (result.success) {
      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/profile');
      }, 1200);
    } else {
      setErrorMessage(result.message);
    }
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
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2.2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1.5px solid var(--color-secondary)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src="/logo.png"
            alt="StyleAura Logo"
            style={{
              width: '67px',
              height: '67px',
              objectFit: 'contain',
              borderRadius: '8px',
              display: 'block',
              margin: '0 auto 1rem'
            }}
          />
          <h1 style={{ fontSize: '1.9rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>
            Create Your Account
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Enjoy private previews, seasonal discounts, and complimentary gift wrapping.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div
            style={{
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.86rem',
              marginBottom: '1.4rem',
              border: '1px solid #C8E6C9',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
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
          {/* Name */}
          <div className="luxury-input-group">
            <label>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aria Montgomery"
                className="luxury-input"
                style={{ paddingLeft: '2.8rem' }}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="luxury-input-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aria@example.com"
                className="luxury-input"
                style={{ paddingLeft: '2.8rem' }}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="luxury-input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
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

          {/* Confirm Password */}
          <div className="luxury-input-group">
            <label>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="luxury-input"
                style={{ paddingLeft: '2.8rem' }}
                required
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.6rem' }}>
            <input
              type="checkbox"
              id="terms-check"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ accentColor: 'var(--color-accent)', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="terms-check" style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              I agree to the <a href="#terms" style={{ color: 'var(--color-accent)' }}>Terms & Conditions</a> and Boutique Privacy Policy.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-luxury-primary"
            style={{ width: '100%', padding: '0.9rem', fontSize: '0.98rem' }}
            disabled={loading}
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Switch to Login */}
        <div style={{ textAlign: 'center', marginTop: '1.8rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-neutral-light)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
