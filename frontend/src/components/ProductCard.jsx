import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0]?.name || 'Pastel', 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      {/* Elegantly Proportioned Vertical Box Card */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: isHovered
            ? '0 10px 24px rgba(128, 96, 168, 0.18)'
            : '0 3px 10px rgba(86, 54, 111, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
        className="vertical-product-box"
      >
        {/* Vertical Portrait Image Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '260px',
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg)'
          }}
        >
          <Link
            to={`/product/${product.id}`}
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: isHovered ? 'scale(1.06)' : 'scale(1)'
              }}
            />
          </Link>

          {/* Badges */}
          <div style={{ position: 'absolute', top: '0.65rem', left: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', zIndex: 2 }}>
            {product.isTrending && (
              <span className="luxury-badge badge-trending" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                Trending
              </span>
            )}
            {product.isNewArrival && !product.isTrending && (
              <span className="luxury-badge badge-new" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                New
              </span>
            )}
            {product.isBestSeller && !product.isTrending && !product.isNewArrival && (
              <span className="luxury-badge badge-bestseller" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                Best Seller
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="luxury-badge badge-sale" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            aria-label="Save to wishlist"
            style={{
              position: 'absolute',
              top: '0.65rem',
              right: '0.65rem',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              border: isFavorited ? '1px solid var(--color-accent)' : '1px solid rgba(197, 165, 232, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isFavorited ? 'var(--color-accent)' : 'var(--color-dark)',
              zIndex: 3,
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            <Heart
              size={17}
              fill={isFavorited ? 'var(--color-accent)' : 'none'}
              strokeWidth={2}
            />
          </button>

          {/* Quick View Button on Hover */}
          <div
            style={{
              position: 'absolute',
              bottom: '0.65rem',
              left: '0.65rem',
              right: '0.65rem',
              display: 'flex',
              justifyContent: 'center',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
              transition: 'all 0.25s ease',
              zIndex: 3
            }}
          >
            <button
              onClick={handleQuickViewClick}
              style={{
                width: '100%',
                padding: '0.45rem 0.8rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--color-dark)',
                border: '1px solid var(--color-secondary)',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(86, 54, 111, 0.12)'
              }}
            >
              <Eye size={14} />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Vertical Card Info */}
        <div style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                {product.categoryName}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#E65100', fontSize: '0.75rem', fontWeight: 600 }}>
                <Star size={12} fill="#E65100" />
                <span>{product.rating}</span>
                <span style={{ color: 'var(--color-text-light)', fontSize: '0.68rem' }}>({product.reviewsCount})</span>
              </div>
            </div>

            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: 'none', color: 'var(--color-dark)' }}
            >
              <h4
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  lineHeight: 1.35,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
                title={product.name}
              >
                {product.name}
              </h4>
            </Link>
          </div>

          {/* Pricing & Add to Cart Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.55rem', borderTop: '1px solid var(--color-neutral-light)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              aria-label="Add to cart"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                backgroundColor: justAdded ? '#4CAF50' : 'var(--color-primary-light)',
                color: justAdded ? '#FFFFFF' : 'var(--color-dark)',
                border: justAdded ? '1px solid #4CAF50' : '1px solid var(--color-secondary)',
                borderRadius: '999px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {justAdded ? (
                <>
                  <Check size={13} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
