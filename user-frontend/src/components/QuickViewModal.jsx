import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Pastel');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(54, 32, 77, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 2100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '850px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(54, 32, 77, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          position: 'relative',
          border: '1.5px solid var(--color-secondary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            background: 'var(--color-primary-light)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-dark)',
            transition: 'background-color 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {/* Product Image Section */}
        <div style={{ backgroundColor: 'var(--color-bg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '100%', height: '360px', overflow: 'hidden', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={activeImage}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)'
              }}
            />
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: activeImage === imgUrl ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none'
                  }}
                >
                  <img src={imgUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div style={{ padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="luxury-badge badge-new">{product.categoryName}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#E65100', fontSize: '0.85rem' }}>
                <Star size={15} fill="#E65100" />
                <span style={{ fontWeight: 600 }}>{product.rating}</span>
                <span style={{ color: 'var(--color-text-light)', fontSize: '0.78rem' }}>({product.reviewsCount})</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.45rem', color: 'var(--color-dark)', marginBottom: '0.6rem' }}>
              {product.name}
            </h3>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.05rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="luxury-badge badge-sale">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.4rem' }}>
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-dark)', display: 'block', marginBottom: '0.4rem' }}>
                  Color: <span style={{ color: 'var(--color-accent)' }}>{selectedColor}</span>
                </label>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: col.hex,
                        border: selectedColor === col.name ? '2.5px solid var(--color-dark)' : '1px solid rgba(0,0,0,0.15)',
                        boxShadow: selectedColor === col.name ? '0 0 8px rgba(128,96,168,0.5)' : 'none',
                        cursor: 'pointer'
                      }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-dark)', display: 'block', marginBottom: '0.4rem' }}>
                  Select Size:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: selectedSize === sz ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                        backgroundColor: selectedSize === sz ? 'var(--color-primary-light)' : '#FFFFFF',
                        color: selectedSize === sz ? 'var(--color-dark)' : 'var(--color-text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-dark)' }}>
                Quantity:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '34px', height: '34px', border: 'none', background: 'var(--color-bg)', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--color-dark)' }}
                >
                  -
                </button>
                <span style={{ width: '40px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '34px', height: '34px', border: 'none', background: 'var(--color-bg)', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--color-dark)' }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div>
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <button
                onClick={handleAddToCart}
                className="btn-luxury-primary"
                style={{ flex: 1, padding: '0.85rem' }}
                disabled={addedAnimation}
              >
                {addedAnimation ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                style={{
                  width: '50px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-secondary)',
                  background: isFavorited ? 'var(--color-primary)' : '#FFFFFF',
                  color: isFavorited ? 'var(--color-accent)' : 'var(--color-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Heart size={20} fill={isFavorited ? 'var(--color-accent)' : 'none'} />
              </button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'underline' }}
              >
                View Complete Product Details & Specs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
