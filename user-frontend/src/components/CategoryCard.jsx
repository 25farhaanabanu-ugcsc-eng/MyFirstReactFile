import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link
      to={`/shop?category=${category.id}`}
      style={{
        textDecoration: 'none',
        display: 'block',
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        height: '320px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.35s ease',
        border: '1px solid var(--color-border-subtle)'
      }}
      className="category-card-hover"
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.name}
        onError={(e) => {
          if (category.fallbackImage) {
            e.target.src = category.fallbackImage;
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      {/* Lavender Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(86, 54, 111, 0.15) 0%, rgba(58, 32, 77, 0.78) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.6rem',
          color: '#FFFFFF'
        }}
      >
        {category.badge && (
          <span
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(233, 221, 247, 0.92)',
              color: 'var(--color-dark)',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.6rem'
            }}
          >
            {category.badge}
          </span>
        )}

        <h3
          style={{
            color: '#FFFFFF',
            fontSize: '1.45rem',
            marginBottom: '0.25rem',
            fontFamily: 'var(--font-serif)'
          }}
        >
          {category.name}
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.4rem'
          }}
        >
          <span
            style={{
              fontSize: '0.82rem',
              color: 'var(--color-primary-light)',
              fontWeight: 500
            }}
          >
            {category.itemCount || 30}+ Curated Styles
          </span>

          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease, transform 0.2s ease'
            }}
            className="arrow-circle"
          >
            <ArrowRight size={16} color="#FFFFFF" />
          </span>
        </div>
      </div>

      <style>{`
        .category-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(86, 54, 111, 0.22);
        }
        .category-card-hover:hover img {
          transform: scale(1.08);
        }
        .category-card-hover:hover .arrow-circle {
          background-color: var(--color-accent);
          transform: translateX(4px);
        }
      `}</style>
    </Link>
  );
}
