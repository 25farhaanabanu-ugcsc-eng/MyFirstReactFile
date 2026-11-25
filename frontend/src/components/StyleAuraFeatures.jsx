import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, Layers, Scale, ArrowRight, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

export default function StyleAuraFeatures() {
  const { products } = useProducts();

  // A. AI Style Assistant state
  const [occasion, setOccasion] = useState('Festive & Wedding');
  const [vibe, setVibe] = useState('Ethereal & Luxury');

  // C. Style Finder Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ mood: '', palette: '', fit: '' });

  // G. Compare Products state
  const [compareIds, setCompareIds] = useState(() => products.slice(0, 3).map(p => p.id));

  const aiRecommendations = products
    .filter(p => {
      if (occasion === 'Festive & Wedding') return p.category === 'traditional' || p.category === 'women' || p.isBestSeller;
      if (occasion === 'Casual Brunch') return p.category === 'casual' || p.category === 'women';
      if (occasion === 'Formal & Office') return p.category === 'men' || p.category === 'accessories';
      return p.isTrending;
    })
    .slice(0, 4);

  const exclusiveProducts = products.filter(p => p.isTrending || p.isBestSeller).slice(0, 4);
  const comparedProducts = products.filter(p => compareIds.includes(p.id)).slice(0, 3);

  const toggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const quizQuestions = [
    { key: 'mood', q: 'What is your primary style mood?', options: ['Minimalist Chic', 'Royal & Festive', 'Effortless Casual', 'Bold Trendsetter'] },
    { key: 'palette', q: 'Which colour palette speaks to you?', options: ['Soft Lavender & Lilac', 'Deep Plum & Mauve', 'Classic Neutrals', 'Pastel Florals'] },
    { key: 'fit', q: 'Preferred silhouette?', options: ['Flowy & Relaxed', 'Tailored & Structured', 'Layered & Artisanal'] }
  ];

  const outfitCombos = [
    { title: 'Lavender Evening Gala', occasion: 'Evening', items: ['Silk Maxi Dress', 'Crystal Clutch', 'Pearl Drop Earrings'], link: '/shop?category=women' },
    { title: 'Sartorial Linen Brunch', occasion: 'Daytime', items: ['Pastel Lilac Linen Shirt', 'Tailored Chinos', 'Leather Loafers'], link: '/shop?category=men' },
    { title: 'Royal Festive Elegance', occasion: 'Festive', items: ['Zari Embroidered Anarkali', 'Silk Dupatta', 'Embellished Potli'], link: '/shop?category=traditional' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', marginTop: '4rem', marginBottom: '4rem' }}>
      {/* H. StyleAura Exclusive Collection */}
      <section className="luxury-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', fontWeight: 700 }}>
              Limited Edition
            </span>
            <h2 style={{ fontSize: '2.1rem', color: 'var(--color-dark)' }}>StyleAura Exclusive Collection</h2>
          </div>
          <Link to="/shop?filter=trending" className="btn-luxury-outline">
            <span>Explore Exclusive</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.6rem' }}>
          {exclusiveProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* A. AI Style Assistant */}
      <section className="luxury-container">
        <div style={{ backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--color-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Sparkles size={20} color="var(--color-accent)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}>
              AI Style Assistant
            </span>
          </div>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-dark)', marginBottom: '1.2rem' }}>
            Personalised Styling for Your Occasion
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="luxury-input" style={{ maxWidth: '240px', backgroundColor: '#FFFFFF' }}>
              <option>Festive &amp; Wedding</option>
              <option>Casual Brunch</option>
              <option>Formal &amp; Office</option>
              <option>Evening Party</option>
            </select>
            <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="luxury-input" style={{ maxWidth: '240px', backgroundColor: '#FFFFFF' }}>
              <option>Ethereal &amp; Luxury</option>
              <option>Minimalist Modern</option>
              <option>Classic Heritage</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {aiRecommendations.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* C. Style Finder Quiz & E. Outfit Inspiration */}
      <section className="luxury-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Style Finder Quiz */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Compass size={19} color="var(--color-accent)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)' }}>Style Finder Quiz</span>
          </div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>Discover Your Signature Look</h3>
          {quizStep < quizQuestions.length ? (
            <div>
              <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '1rem' }}>
                Step {quizStep + 1} of {quizQuestions.length}: {quizQuestions[quizStep].q}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {quizQuestions[quizStep].options.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setQuizAnswers(prev => ({ ...prev, [quizQuestions[quizStep].key]: opt }));
                      setQuizStep(quizStep + 1);
                    }}
                    className="btn-luxury-outline"
                    style={{ justifyContent: 'flex-start', padding: '0.65rem 1rem' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                <p style={{ fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={16} /> Your Style Profile: {quizAnswers.mood}
                </p>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                  Recommended: {quizAnswers.palette} in {quizAnswers.fit} silhouettes.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <Link to="/shop" className="btn-luxury-primary">Shop Your Match</Link>
                <button type="button" onClick={() => setQuizStep(0)} className="btn-luxury-outline">Retake Quiz</button>
              </div>
            </div>
          )}
        </div>

        {/* Outfit Inspiration */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Layers size={19} color="var(--color-accent)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)' }}>Outfit Inspiration</span>
          </div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>Ready-Made Combinations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {outfitCombos.map(combo => (
              <div key={combo.title} style={{ padding: '0.9rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>{combo.occasion}</span>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-dark)' }}>{combo.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{combo.items.join(' • ')}</p>
                </div>
                <Link to={combo.link} className="btn-luxury-outline" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  Shop Look
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. Compare Products */}
      <section className="luxury-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Scale size={19} color="var(--color-accent)" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)' }}>Side-by-Side</span>
        </div>
        <h2 style={{ fontSize: '1.9rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>Compare Products</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          {products.slice(0, 6).map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => toggleCompare(p.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: compareIds.includes(p.id) ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                backgroundColor: compareIds.includes(p.id) ? 'var(--color-primary-light)' : '#FFFFFF',
                color: 'var(--color-dark)',
                cursor: 'pointer'
              }}
            >
              {compareIds.includes(p.id) ? '✓ ' : '+ '}
              {p.name.split(' ').slice(0, 3).join(' ')}
            </button>
          ))}
        </div>

        <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-dark)' }}>
                <th style={{ padding: '0.9rem 1rem' }}>Feature</th>
                {comparedProducts.map(p => (
                  <th key={p.id} style={{ padding: '0.9rem 1rem' }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Price</td>
                {comparedProducts.map(p => <td key={p.id} style={{ padding: '0.8rem 1rem', fontWeight: 700, color: 'var(--color-dark)' }}>₹{p.price}</td>)}
              </tr>
              <tr style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Rating</td>
                {comparedProducts.map(p => <td key={p.id} style={{ padding: '0.8rem 1rem' }}>★ {p.rating} ({p.reviewsCount} reviews)</td>)}
              </tr>
              <tr style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Sizes</td>
                {comparedProducts.map(p => <td key={p.id} style={{ padding: '0.8rem 1rem' }}>{p.sizes?.join(', ') || 'Standard'}</td>)}
              </tr>
              <tr style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Colours</td>
                {comparedProducts.map(p => <td key={p.id} style={{ padding: '0.8rem 1rem' }}>{p.colors?.map(c => c.name).join(', ') || 'Lavender'}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
