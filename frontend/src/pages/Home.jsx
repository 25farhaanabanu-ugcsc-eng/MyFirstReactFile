import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  ShoppingBag, 
  TrendingUp, 
  Flame, 
  ChevronRight,
  Award
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import StyleAuraFeatures from '../components/StyleAuraFeatures';

export default function Home() {
  const { products, categories } = useProducts();
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: "Discover Your Style",
      subtitle: "Curated elegance in soft lavender tones, pure silks, and tailored silhouettes.",
      badge: "Spring Lavender Collection",
      cta: "Shop The Collection",
      link: "/shop",
      image: "/dress1.png",
      tag: "Womens Couture"
    },
    {
      title: "western wears",
      subtitle: "Curated elegance in blue tones, pure silks, and tailored silhouettes,flore design.",
      badge: "Spring Lavender Collection",
      cta: "Shop women's Wear",
      link: "https://www.myntra.com/dress/janasya/janasya-floral-flared-western-dress/33011508/buy",
      image: "/dress4.png",
      tag: "Womens Couture"
    },
    {
      title: "Sartorial Menswear & Linens",
      subtitle: "Refined European flax shirts, pastel blazers, and timeless everyday essentials.",
      badge: "New Season Arrivals",
      cta: "Shop Men's Wear",
      link: "/shop?category=men",
      image: "/dress2.png",
      tag: "Gentlemen's Edit"
    },
    {
      title: "Playful Pastel Ensembles",
      subtitle: "Charming florals, gentle fabrics, and celebration-ready designs for little stars.",
      badge: "Kids' Luxury Wardrobe",
      cta: "Shop Kids' Wear",
      link: "/shop?category=kids",
      image: "/dress3.png",
      tag: "Little Stars"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const trendingProducts = products.filter(p => p.isTrending);
  const newArrivals = products.filter(p => p.isNewArrival);
  const bestSellers = products.filter(p => p.isBestSeller);

  const testimonials = [
    {
      id: 1,
      name: "Victoria Sterling",
      role: "Fashion Editor",
      comment: "The lavender silk dress exceeded all expectations. The delicate drape and soft pastel sheen are reminiscent of Parisian couture.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Julian DeWitt",
      role: "Creative Director",
      comment: "StyleAura's linen shirts have become my absolute staple. Exceptional flax quality and exquisite pastel tailoring.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Camille Laurent",
      role: "Celebrity Stylist",
      comment: "From the delicate packaging to the luxury fabrication, shopping at StyleAura is pure elegance.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '3rem' }}>
      
      {/* 1. HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #F4ECFD 0%, #E9DDF7 60%, #E2D1F5 100%)',
          borderRadius: '0 0 28px 28px',
          padding: '2.5rem 0 3.2rem',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="luxury-container">
          <div
              className="home-hero-grid"
              style={{display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'center'
              }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: '540px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-dark)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-sm)',
                  marginBottom: '1rem',
                  border: '1px solid var(--color-secondary)'
                }}
              >
                <Sparkles size={14} color="var(--color-accent)" />
                <span>{heroSlides[heroSlide].badge}</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
                  color: 'var(--color-dark)',
                  fontWeight: 700,
                  lineHeight: 1.18,
                  marginBottom: '0.8rem'
                }}
              >
                {heroSlides[heroSlide].title}
              </h1>

              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--color-text-main)',
                  lineHeight: 1.6,
                  marginBottom: '1.6rem'
                }}
              >
                {heroSlides[heroSlide].subtitle}
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link
                  to={heroSlides[heroSlide].link}
                  className="btn-luxury-primary"
                  style={{ padding: '0.75rem 1.8rem', fontSize: '0.92rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>{heroSlides[heroSlide].cta}</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/categories"
                  className="btn-luxury-secondary"
                  style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem' }}
                >
                  <span>All Categories</span>
                </Link>
              </div>

              {/* Slider Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.8rem' }}>
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlide(idx)}
                    style={{
                      width: heroSlide === idx ? '26px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      border: 'none',
                      backgroundColor: heroSlide === idx ? 'var(--color-accent)' : 'rgba(86, 54, 111, 0.25)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="home-hero-image" style={{ display: 'flex', justifyContent: 'center' }}>
                <div
  className="hero-image-box"
  style={{
    width: '100%',
    maxWidth: '480px',
    height: '520px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 16px 40px rgba(86, 54, 111, 0.18)',
    border: '4px solid #FFFFFF',
    position: 'relative'
  }}
>
                <img
                  src={heroSlides[heroSlide].image}
                  alt={heroSlides[heroSlide].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.5s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.7rem 1rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-accent)', fontWeight: 700 }}>
                      Featured Look
                    </span>
                    <h4 style={{ fontSize: '0.88rem', color: 'var(--color-dark)', margin: 0 }}>
                      {heroSlides[heroSlide].tag}
                    </h4>
                  </div>
                  <Link
                    to={heroSlides[heroSlide].link}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES (SMALL VERTICAL BOX CARDS IN ONE ROW) */}
      <section className="luxury-container category-section">
        <div className="category-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', margin: 0, fontWeight: 700 }}>
              Featured Categories
            </h2>
          </div>
          <Link
            to="/categories"
            style={{ fontSize: '0.84rem', color: 'var(--color-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}
          >
            <span>View All</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Categories Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1.1rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}
          className="vertical-box-row"
        >
          {categories.slice(0, 6).map(category => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                minWidth: '150px'
              }}
              className="small-vertical-cat-card"
            >
              <div style={{ width: '100%', height: '165px', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
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
                    transition: 'transform 0.4s ease'
                  }}
                />
              </div>

              <div style={{ padding: '0.75rem 0.65rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
                <h4
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--color-dark)',
                    margin: '0 0 2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {category.name}
                </h4>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. THREE VERTICAL LINES: TRENDING NOW | NEW ARRIVALS | BEST SELLERS */}
    
{/* GLOSSY PREMIUM COLLECTION */}

<section className="luxury-container">
  <div style={{
    position: 'relative',
    height: '390px',
    borderRadius: '22px',
    overflow: 'hidden',
    background: 'linear-gradient(120deg, #392449, #9C75B8, #E5D4F5)',
    boxShadow: '0 15px 40px rgba(86,54,111,0.25)'
  }}>

    {/* BACKGROUND IMAGE */}
    <img
      src="/dress5.png"
      alt="Premium Fashion Collection"
      style={{
        position: 'absolute',
        width: '100%',
        height: '460px',
        objectFit: 'cover',
        objectPosition: 'center 30%',
        inset: 0
      }}
    />

    {/* DARK LAVENDER OVERLAY */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(48,25,65,0.85), rgba(75,43,94,0.45), rgba(75,43,94,0.05))'
    }} />

    {/* GLOSSY LIGHT EFFECT */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.18) 45%, transparent 65%)',
      pointerEvents: 'none'
    }} />

    {/* CONTENT */}
    <div style={{
      position: 'relative',
      zIndex: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2.5rem',
      maxWidth: '580px',
      color: '#FFFFFF'
    }}>

      <span style={{
        fontSize: '0.78rem',
        letterSpacing: '3px',
        fontWeight: 700,
        color: '#F1DDFB'
      }}>
        ✦ THE EXCLUSIVE EDIT ✦
      </span>

      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        lineHeight: 1.15,
        margin: '1rem 0',
        color: '#FFFFFF',
        textShadow: '0 3px 15px rgba(0,0,0,0.25)'
      }}>
        Discover the Art of Elegance
      </h2>

      <p style={{
        fontSize: '0.95rem',
        lineHeight: 1.8,
        color: '#F5EAFB',
        maxWidth: '390px',
        marginBottom: '1.5rem'
      }}>
        Where timeless beauty meets modern fashion.
        Explore styles designed to make every moment special.
      </p>

      <Link to="/shop" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.7rem',
        width: 'fit-content',
        padding: '0.85rem 1.6rem',
        borderRadius: '50px',
        color: '#FFFFFF',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '0.9rem',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08))',
        border: '1px solid rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 5px 20px rgba(255,255,255,0.18)'
      }}>
        Explore Collection
        <ArrowRight size={17} />
      </Link>

    </div>
  </div>
</section>

{/* END GLOSSY PREMIUM COLLECTION */}
  
{/* 3. TRENDING NOW */}

<section className="luxury-container">
  <div
    className="home-horizontal-row"
   style={{
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.2rem'
  }}>
    <h2>Trending Now</h2>
    <Link to="/shop?sort=popularity">View All →</Link>
  </div>

  <div className="home-horizontal-row" style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(150px, 1fr))',
    gap: '1.1rem',
    overflowX: 'auto'
  }}>
    {trendingProducts.slice(0, 6).map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>


{/* 4. NEW ARRIVALS */}

<section className="luxury-container">
  <h2>New Arrivals</h2>

  <div 
  className="home-horizontal-row"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(150px, 1fr))',
    gap: '1.1rem',
    overflowX: 'auto'
  }}>
    {newArrivals.slice(0, 6).map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>

{/* 5. BEST SELLERS */}

<section className="luxury-container">
  <h2>Best Sellers</h2>

  <div 
  className="home-horizontal-row"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(150px, 1fr))',
    gap: '1.1rem',
    overflowX: 'auto'
  }}>
    {bestSellers.slice(0, 6).map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>


      {/* 4. PROMOTIONAL BANNER */}
      <section className="luxury-container">
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-deep) 100%)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: '0 12px 30px rgba(86, 54, 111, 0.2)'
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <span
              style={{
                backgroundColor: 'rgba(197, 165, 232, 0.25)',
                color: 'var(--color-primary-light)',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.6rem'
              }}
            >
              Exclusive Offer
            </span>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.7rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
              Spring Lavender Couture • Up to 40% Off
            </h3>
            <p style={{ color: 'var(--color-neutral)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
              Use coupon code <strong>LAVENDER15</strong> at checkout for an extra 15% discount on all silk and linen styles.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#FFFFFF',
                border: '1px dashed var(--color-secondary)'
              }}
            >
              LAVENDER15
            </div>
            <Link
              to="/shop"
              className="btn-luxury-secondary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section style={{ backgroundColor: '#F8F1FC', padding: '3.5rem 0', borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="luxury-container">
          <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-dark)', marginBottom: '0.3rem' }}>
              Client Testimonials
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Discover why discerning shoppers cherish their StyleAura pieces.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '1.6rem',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', gap: '0.2rem', color: '#E65100', marginBottom: '0.8rem' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#E65100" />
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--color-text-main)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                  "{item.comment}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <img src={item.avatar} alt={item.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h5 style={{ fontSize: '0.88rem', color: 'var(--color-dark)', margin: 0 }}>{item.name}</h5>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* Responsive Styles */}
      <StyleAuraFeatures />

      <style>{`
        .small-vertical-cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(128, 96, 168, 0.18);
          border-color: var(--color-accent);
        }
        .small-vertical-cat-card:hover img {
          transform: scale(1.08);
        }
        @media (max-width: 900px) {
          .vertical-box-row {
            grid-template-columns: repeat(6, 150px) !important;
          }
          .three-vertical-columns {
            grid-template-columns: 1fr !important;
          }
        }
          @media screen and (max-width: 600px) {
  .home-hero-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
}
  /* Mobile Horizontal Scrolling */
@media screen and (max-width: 600px) {

  /* Featured Categories */
  .vertical-box-row {
    display: grid !important;
    grid-auto-flow: column !important;
    grid-auto-columns: 150px !important;
    grid-template-columns: none !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    gap: 12px !important;
    padding-bottom: 12px !important;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .small-vertical-cat-card {
    min-width: 150px !important;
    scroll-snap-align: start;
  }

  /* Trending, New Arrivals, Best Sellers */
  .home-horizontal-row {
    display: grid !important;
    grid-auto-flow: column !important;
    grid-auto-columns: 72% !important;
    grid-template-columns: none !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    gap: 12px !important;
    padding-bottom: 12px !important;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .home-horizontal-row > * {
    min-width: 0;
    scroll-snap-align: start;
  }

  /* Hide scrollbar but allow swiping */
  .vertical-box-row::-webkit-scrollbar,
  .home-horizontal-row::-webkit-scrollbar {
    display: none;
  }

  .vertical-box-row,
  .home-horizontal-row {
    scrollbar-width: none;
  }
}
  @media screen and (max-width: 600px) {
  .category-section {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  .category-section .vertical-box-row {
    display: flex !important;
    flex-wrap: nowrap !important;
    width: 100% !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    gap: 12px !important;
    padding: 4px 4px 14px !important;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x;
  }

  .category-section .small-vertical-cat-card {
    flex: 0 0 150px !important;
    width: 150px !important;
    min-width: 150px !important;
    scroll-snap-align: start;
  }

  .category-section .vertical-box-row::-webkit-scrollbar {
    display: none;
  }
}
      `}
      </style>

    </div>
  );
}
