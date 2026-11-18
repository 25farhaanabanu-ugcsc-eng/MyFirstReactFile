import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {
  const { categories, products } = useProducts();

  return (
    <div className="luxury-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '680px',
          margin: '0 auto 3.5rem',
          padding: '2rem 1rem'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-dark)',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '1rem',
            border: '1px solid var(--color-secondary)'
          }}
        >
          <Sparkles size={15} color="var(--color-accent)" />
          <span>Curated Haute Departments</span>
        </div>

        <h1 style={{ fontSize: '2.8rem', color: 'var(--color-dark)', marginBottom: '0.8rem' }}>
          Explore by Category
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Discover our dedicated couture departments. Every silhouette is thoughtfully designed in harmony with our signature lavender and pastel color story.
        </p>
      </div>

      {/* Grid of All Categories */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}
      >
        {categories.map(category => {
          // Count active products in this category
          const matchingProductsCount = products.filter(p => p.category === category.id).length;

          return (
            <div
              key={category.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.35s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="cat-showcase-card"
            >
              {/* Category Visual */}
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={category.image}
                  alt={category.name}
                  onError={(e) => {
                    if (category.fallbackImage) e.target.src = category.fallbackImage;
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(4px)',
                    color: 'var(--color-dark)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {category.badge || 'Haute'}
                </div>
              </div>

              {/* Category Info */}
              <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--color-dark)' }}>
                      {category.name}
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                      {matchingProductsCount} Styles
                    </span>
                  </div>

                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {category.description}
                  </p>
                </div>

                <Link
                  to={`/shop?category=${category.id}`}
                  className="btn-luxury-secondary"
                  style={{ width: '100%', justifyContent: 'space-between', padding: '0.85rem 1.4rem' }}
                >
                  <span>Shop {category.name}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .cat-showcase-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(86, 54, 111, 0.15);
        }
        .cat-showcase-card:hover img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
