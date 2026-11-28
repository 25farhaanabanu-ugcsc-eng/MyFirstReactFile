import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0]?.name || 'Pastel', 1);
    removeFromWishlist(product.id);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(product => {
      addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0]?.name || 'Pastel', 1);
    });
    clearWishlist();
  };

  if (wishlist.length === 0) {
    return (
      <div className="luxury-container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '2px solid var(--color-secondary)'
          }}
        >
          <Heart size={44} strokeWidth={1.5} />
        </div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--color-dark)', marginBottom: '0.6rem' }}>
          Your Wishlist is Empty
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 2.2rem', lineHeight: 1.6 }}>
          Save your most coveted looks and dream wardrobe pieces here for quick access.
        </p>
        <Link to="/shop" className="btn-luxury-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}>
          <span>Explore The Collections</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="luxury-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-accent)', marginBottom: '0.3rem' }}>
            <Sparkles size={16} />
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              Curated Favorites
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-dark)' }}>
            Saved Wishlist ({wishlist.length})
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleMoveAllToCart}
            className="btn-luxury-primary"
            style={{ padding: '0.75rem 1.6rem', fontSize: '0.88rem' }}
          >
            <ShoppingBag size={16} />
            <span>Move All to Bag</span>
          </button>
          <button
            onClick={clearWishlist}
            className="btn-luxury-outline"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}
      >
        {wishlist.map(product => (
          <div
            key={product.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', height: '320px', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Link>

              {/* Remove button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                title="Remove from wishlist"
                style={{
                  position: 'absolute',
                  top: '0.8rem',
                  right: '0.8rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--color-danger)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Trash2 size={17} />
              </button>
            </div>

            {/* Info & Actions */}
            <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 600 }}>
                  {product.categoryName}
                </span>

                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-dark)', margin: '0.3rem 0 0.6rem' }}>
                    {product.name}
                  </h3>
                </Link>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="btn-luxury-primary"
                  style={{ flex: 1, padding: '0.75rem', fontSize: '0.86rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
