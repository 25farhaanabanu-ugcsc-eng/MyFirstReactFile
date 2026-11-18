import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function SearchBar({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const { products, categories } = useProducts();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'all' || product.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}&category=${selectedCat}`);
      onClose();
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(54, 32, 77, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem 1.5rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(54, 32, 77, 0.25)',
          overflow: 'hidden',
          border: '1.5px solid var(--color-secondary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <Search size={22} color="var(--color-accent)" style={{ position: 'absolute', left: '1.25rem' }} />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dresses, shirts, silk scarves, jackets..."
            style={{
              width: '100%',
              padding: '1.25rem 3.5rem 1.25rem 3.25rem',
              fontSize: '1.1rem',
              border: 'none',
              outline: 'none',
              color: 'var(--color-dark)',
              fontFamily: 'inherit',
              backgroundColor: '#FFFFFF'
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '3.6rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-light)',
                padding: '0.4rem'
              }}
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '1.2rem',
              background: 'var(--color-primary-light)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'var(--color-dark)',
              padding: '0.45rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </form>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.85rem 1.25rem', backgroundColor: 'var(--color-bg)', overflowX: 'auto', borderBottom: '1px solid var(--color-border)' }}>
          <button
            type="button"
            onClick={() => setSelectedCat('all')}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              border: selectedCat === 'all' ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
              backgroundColor: selectedCat === 'all' ? 'var(--color-accent)' : '#FFFFFF',
              color: selectedCat === 'all' ? '#FFFFFF' : 'var(--color-text-main)'
            }}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: selectedCat === cat.id ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                backgroundColor: selectedCat === cat.id ? 'var(--color-accent)' : '#FFFFFF',
                color: selectedCat === cat.id ? '#FFFFFF' : 'var(--color-text-main)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <Tag size={32} color="var(--color-secondary)" style={{ margin: '0 auto 0.8rem' }} />
              <p style={{ fontWeight: 600, color: 'var(--color-dark)' }}>No items found matching "{searchTerm}"</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Try searching for "silk", "dress", "shirt", or "lavender"</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-light)', fontWeight: 600 }}>
                  Found {filteredProducts.length} Results
                </span>
                {searchTerm && (
                  <button
                    onClick={handleSearchSubmit}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-accent)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    View all in Shop <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {filteredProducts.slice(0, 6).map(prod => (
                <div
                  key={prod.id}
                  onClick={() => handleProductClick(prod.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                    border: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                    e.currentTarget.style.borderColor = 'var(--color-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--color-dark)', fontWeight: 600, marginBottom: '2px' }}>
                      {prod.name}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      {prod.categoryName} • ${prod.price}
                    </span>
                  </div>
                  <ArrowRight size={18} color="var(--color-accent)" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
