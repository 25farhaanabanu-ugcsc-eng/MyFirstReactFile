import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL params if present
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || 'all');
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || 'all');
  const [priceRange, setPriceRange] = useState(Number(searchParams.get('maxPrice')) || 450);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with searchParams on mount or param change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const s = searchParams.get('sort');
    if (s) setSortBy(s);
  }, [searchParams]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = [
    { name: 'Lavender', hex: '#E9DDF7' },
    { name: 'Purple', hex: '#C5A5E8' },
    { name: 'Mauve', hex: '#8060A8' },
    { name: 'Plum', hex: '#56366F' },
    { name: 'Lilac', hex: '#D6C7EC' }
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    const searchQuery = (searchParams.get('search') || searchParams.get('q') || '').toLowerCase().trim();
    const filterParam = searchParams.get('filter');

    return products
      .filter(product => {
        if (filterParam === 'new' && !product.isNewArrival) return false;
        if (filterParam === 'trending' && !product.isTrending) return false;

        // Search filter
        if (searchQuery) {
          const matchTitle = product.name.toLowerCase().includes(searchQuery);
          const matchCat = product.categoryName.toLowerCase().includes(searchQuery);
          const matchDesc = product.description.toLowerCase().includes(searchQuery);
          if (!matchTitle && !matchCat && !matchDesc) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Size filter
        if (selectedSize !== 'all') {
          if (!product.sizes || !product.sizes.includes(selectedSize)) return false;
        }

        // Color filter
        if (selectedColor !== 'all') {
          const hasColor = product.colors && product.colors.some(c => 
            c.name.toLowerCase().includes(selectedColor.toLowerCase())
          );
          if (!hasColor) return false;
        }

        // Price filter
        if (product.price > priceRange) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'popularity') return b.reviewsCount - a.reviewsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedSize, selectedColor, priceRange, sortBy, searchParams]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceRange(450);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSize !== 'all' || selectedColor !== 'all' || priceRange < 450 || sortBy !== 'featured';

  return (
    <div className="luxury-container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.8rem 2rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          border: '1px solid var(--color-secondary)'
        }}
      >
        <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-dark)', fontWeight: 700 }}>
          The Haute Edit
        </span>
        <h1 style={{ fontSize: '2.6rem', color: 'var(--color-dark)', marginTop: '0.3rem', marginBottom: '0.5rem' }}>
          {selectedCategory !== 'all' 
            ? categories.find(c => c.id === selectedCategory)?.name || 'Boutique Catalog'
            : 'All Collections'}
        </h1>
        <p style={{ color: 'var(--color-text-main)', maxWidth: '540px', margin: '0 auto', fontSize: '0.98rem' }}>
          Discover hand-finished garments in delicate lilac undertones, pure mulberry silks, and breathable luxury linens.
        </p>
      </div>

      {/* Main Grid: Filters Sidebar + Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '2.5rem', alignItems: 'start' }} className="shop-layout-grid">
        
        {/* DESKTOP FILTERS SIDEBAR */}
        <aside
          className="desktop-filter-sidebar"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '1.8rem',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: '95px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-dark)', fontWeight: 700, fontSize: '1.05rem' }}>
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-accent)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div style={{ marginBottom: '1.6rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 700, marginBottom: '0.8rem' }}>
              Category
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '6px',
                  backgroundColor: selectedCategory === 'all' ? 'var(--color-primary-light)' : 'transparent',
                  color: selectedCategory === 'all' ? 'var(--color-dark)' : 'var(--color-text-main)',
                  fontWeight: selectedCategory === 'all' ? 700 : 400
                }}
              >
                <span>All Categories</span>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                  style={{ accentColor: 'var(--color-accent)' }}
                />
              </label>

              {categories.map(cat => (
                <label
                  key={cat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    padding: '0.3rem 0.5rem',
                    borderRadius: '6px',
                    backgroundColor: selectedCategory === cat.id ? 'var(--color-primary-light)' : 'transparent',
                    color: selectedCategory === cat.id ? 'var(--color-dark)' : 'var(--color-text-main)',
                    fontWeight: selectedCategory === cat.id ? 700 : 400
                  }}
                >
                  <span>{cat.name}</span>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(cat.id)}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* 2. Price Range Slider */}
          <div style={{ marginBottom: '1.6rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 700 }}>
                Max Price
              </h4>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                ₹{priceRange}
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="450"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--color-accent)',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.2rem' }}>
              <span>₹40</span>
              <span>₹450</span>
            </div>
          </div>

          {/* 3. Sizes */}
          <div style={{ marginBottom: '1.6rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 700, marginBottom: '0.6rem' }}>
              Size
            </h4>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSelectedSize('all')}
                style={{
                  padding: '0.35rem 0.7rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedSize === 'all' ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                  backgroundColor: selectedSize === 'all' ? 'var(--color-accent)' : '#FFFFFF',
                  color: selectedSize === 'all' ? '#FFFFFF' : 'var(--color-text-main)'
                }}
              >
                All
              </button>
              {allSizes.map(sz => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(selectedSize === sz ? 'all' : sz)}
                  style={{
                    padding: '0.35rem 0.7rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedSize === sz ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                    backgroundColor: selectedSize === sz ? 'var(--color-accent)' : '#FFFFFF',
                    color: selectedSize === sz ? '#FFFFFF' : 'var(--color-text-main)'
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Color Palette */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 700, marginBottom: '0.6rem' }}>
              Color Tone
            </h4>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSelectedColor('all')}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedColor === 'all' ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                  backgroundColor: selectedColor === 'all' ? 'var(--color-accent)' : '#FFFFFF',
                  color: selectedColor === 'all' ? '#FFFFFF' : 'var(--color-text-main)'
                }}
              >
                All Tones
              </button>
              {allColors.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(selectedColor === c.name ? 'all' : c.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedColor === c.name ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                    backgroundColor: selectedColor === c.name ? 'var(--color-primary-light)' : '#FFFFFF',
                    color: 'var(--color-dark)'
                  }}
                >
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: c.hex, border: '1px solid rgba(0,0,0,0.15)' }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS CONTENT COLUMN */}
        <div>
          {/* Top Sort Bar & Results Counter */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.4rem',
              marginBottom: '1.8rem',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="mobile-filter-btn"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-secondary)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-dark)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Filter size={15} />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Showing <strong style={{ color: 'var(--color-dark)' }}>{filteredProducts.length}</strong> styles
              </span>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowUpDown size={16} color="var(--color-accent)" />
              <label htmlFor="shop-sort" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Sort by:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-dark)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured Collection</option>
                <option value="newest">New Arrivals</option>
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '4rem 2rem',
                textAlign: 'center',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <ShoppingBag size={48} color="var(--color-secondary)" style={{ margin: '0 auto 1.2rem' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>
                No styles match your selection
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                Try relaxing your price range or clearing your size and color filters to discover more items.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-luxury-primary"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
  className="shop-products-grid"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
    gap: '1.25rem'
  }}
>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(54, 32, 77, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 3000,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-dark)' }}>Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Category List */}
              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: 'var(--color-dark)' }}>Category</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="luxury-input"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Price */}
              <div style={{ marginBottom: '1.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-dark)' }}>Max Price</h4>
                  <span style={{ fontWeight: 700 }}>₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="450"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                />
              </div>

              {/* Mobile Size */}
              <div style={{ marginBottom: '1.4rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: 'var(--color-dark)' }}>Size</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedSize('all')}
                    style={{
                      padding: '0.35rem 0.7rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      background: selectedSize === 'all' ? 'var(--color-accent)' : '#FFF',
                      color: selectedSize === 'all' ? '#FFF' : 'inherit',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    All
                  </button>
                  {allSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(selectedSize === sz ? 'all' : sz)}
                      style={{
                        padding: '0.35rem 0.7rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        background: selectedSize === sz ? 'var(--color-accent)' : '#FFF',
                        color: selectedSize === sz ? '#FFF' : 'inherit',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button
                onClick={handleResetFilters}
                className="btn-luxury-outline"
                style={{ flex: 1, padding: '0.75rem' }}
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-luxury-primary"
                style={{ flex: 1, padding: '0.75rem' }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 899px) {
          .shop-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-filter-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
