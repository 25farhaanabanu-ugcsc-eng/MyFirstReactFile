import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setSubmitted(true);
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
            Forgot Password
          </h1>
        </div>

        {submitted ? (
          <div
            style={{
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              border: '1px solid #C8E6C9',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
            <span>
              If an account exists for <strong>{email}</strong>, a password reset link has been sent.
            </span>
          </div>
        ) : (
          <>
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

            <form onSubmit={handleSubmit}>
              <div className="luxury-input-group" style={{ marginBottom: '1.6rem' }}>
                <label>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={18}
                    color="var(--color-text-light)"
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
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

              <button
                type="submit"
                className="btn-luxury-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '0.98rem' }}
              >
                <span>Send Reset Link</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: '1.8rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-neutral-light)'
          }}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
