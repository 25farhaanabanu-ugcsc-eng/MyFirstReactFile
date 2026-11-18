import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight, 
  Share2, 
  ArrowLeft,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProductById } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = getProductById(id) || products[0];

  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes?.[0] || 'M');
      setSelectedColor(product.colors?.[0]?.name || 'Pastel');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="luxury-container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ margin: '1rem 0 2rem' }}>The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="btn-luxury-primary">Back to Shop</Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="luxury-container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      
      {/* Breadcrumb Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--color-text-light)', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" style={{ color: 'var(--color-text-muted)' }}>Shop</Link>
        <ChevronRight size={14} />
        <Link to={`/shop?category=${product.category}`} style={{ color: 'var(--color-text-muted)' }}>{product.categoryName}</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-dark)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
        
        {/* Gallery / Image Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Main Large Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-bg)',
              boxShadow: '0 12px 35px rgba(86, 54, 111, 0.1)',
              border: '1px solid var(--color-border-subtle)',
              height: '520px'
            }}
          >
            <img
              src={activeImage}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Badges */}
            <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', display: 'flex', gap: '0.5rem' }}>
              {product.isTrending && <span className="luxury-badge badge-trending">Trending</span>}
              {product.isNewArrival && <span className="luxury-badge badge-new">New Season</span>}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Wishlist"
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isFavorited ? 'var(--color-accent)' : 'var(--color-dark)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Heart size={20} fill={isFavorited ? 'var(--color-accent)' : 'none'} />
            </button>
          </div>

          {/* Thumbnails Row */}
          {product.gallery && product.gallery.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImage === imgUrl ? '2.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    background: 'none',
                    padding: 0,
                    flexShrink: 0,
                    boxShadow: activeImage === imgUrl ? '0 0 12px rgba(128, 96, 168, 0.4)' : 'none'
                  }}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Purchase Area */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span className="luxury-badge badge-new">{product.categoryName}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>SKU: {product.sku}</span>
          </div>

          <h1 style={{ fontSize: '2.3rem', color: 'var(--color-dark)', marginBottom: '0.8rem', lineHeight: 1.25 }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#E65100' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? '#E65100' : 'none'}
                  strokeWidth={1.5}
                />
              ))}
              <span style={{ fontWeight: 700, fontSize: '0.92rem', marginLeft: '0.2rem' }}>{product.rating}</span>
            </div>
            <span style={{ color: 'var(--color-text-light)', fontSize: '0.86rem' }}>•</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem' }}>{product.reviewsCount} verified customer reviews</span>
          </div>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.6rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--color-dark)' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '1.3rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                ${product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <span className="luxury-badge badge-sale">
                Save ${product.originalPrice - product.price} ({(Math.round(((product.originalPrice - product.price)/product.originalPrice)*100))}% OFF)
              </span>
            )}
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.6rem' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-dark)', display: 'block', marginBottom: '0.6rem' }}>
                Color: <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: col.hex,
                      border: selectedColor === col.name ? '3px solid var(--color-dark)' : '1px solid rgba(0,0,0,0.15)',
                      boxShadow: selectedColor === col.name ? '0 0 10px rgba(128, 96, 168, 0.5)' : 'none',
                      cursor: 'pointer'
                    }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                  Select Size:
                </label>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-accent)', textDecoration: 'underline', cursor: 'pointer' }}>
                  Size Chart
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '0.55rem 1.2rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      border: selectedSize === sz ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      backgroundColor: selectedSize === sz ? 'var(--color-primary-light)' : '#FFFFFF',
                      color: selectedSize === sz ? 'var(--color-dark)' : 'var(--color-text-main)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: '42px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-dark)' }}
              >
                -
              </button>
              <span style={{ width: '44px', textAlign: 'center', fontSize: '1rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ width: '42px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-dark)' }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-luxury-primary"
              style={{ flex: 1, padding: '0.9rem 2rem', fontSize: '1rem' }}
              disabled={addedAnimation}
            >
              {addedAnimation ? (
                <>
                  <Check size={20} />
                  <span>Added {quantity}x to Shopping Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={20} />
                  <span>Add to Shopping Bag</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              title="Share this style"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1.5px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-dark)'
              }}
            >
              <Share2 size={18} />
            </button>
          </div>

          {copiedLink && (
            <p style={{ color: 'var(--color-accent)', fontSize: '0.82rem', marginBottom: '1.2rem', fontWeight: 600 }}>
              ✓ Product link copied to clipboard!
            </p>
          )}

          {/* Guarantees Strip */}
          <div style={{ backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: '1.2rem 1.4rem', border: '1px solid var(--color-border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--color-dark)' }}>
              <Truck size={18} color="var(--color-accent)" />
              <span>Complimentary luxury delivery on orders over $100</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--color-dark)' }}>
              <RotateCcw size={18} color="var(--color-accent)" />
              <span>30-Day risk-free boutique exchange & returns</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--color-dark)' }}>
              <ShieldCheck size={18} color="var(--color-accent)" />
              <span>100% Guaranteed authentic couture fabrication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', fontWeight: 700 }}>
                You May Also Admire
              </span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--color-dark)', marginTop: '0.2rem' }}>
                Related Styles
              </h2>
            </div>
            <Link to={`/shop?category=${product.category}`} className="btn-luxury-outline">
              <span>View More in {product.categoryName}</span>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.8rem'
            }}
          >
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
