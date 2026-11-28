import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  CreditCard,
  Lock,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { 
    cart, 
    cartCount, 
    subtotal, 
    shipping, 
    freeShippingThreshold, 
    tax, 
    discount, 
    total, 
    promoCode, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const { currentUser, addOrder } = useAuth();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Checkout Form State
  const [shippingForm, setShippingForm] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: 'New York',
    zip: '10001',
    paymentMethod: 'card'
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const res = applyPromoCode(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setInputCode('');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.address) {
      alert('Please fill in your shipping details.');
      return;
    }

    const orderData = {
      customerName: shippingForm.fullName,
      customerEmail: shippingForm.email,
      items: cart.map(i => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
        image: i.image
      })),
      subtotal,
      discount,
      shipping,
      tax,
      total,
      paymentMethod: shippingForm.paymentMethod === 'card' ? 'Credit Card (ending 4242)' : shippingForm.paymentMethod.toUpperCase(),
      shippingAddress: `${shippingForm.address}, ${shippingForm.city} ${shippingForm.zip}`
    };

    const newOrder = addOrder(orderData);
    clearCart();
    setOrderConfirmed(newOrder);
  };

  // Free shipping progress calculation
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // EMPTY STATE
  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className="luxury-container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '2px solid var(--color-secondary)'
          }}
        >
          <ShoppingBag size={42} strokeWidth={1.6} />
        </div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--color-dark)', marginBottom: '0.6rem' }}>
          Your Shopping Bag is Empty
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 2.2rem', lineHeight: 1.6 }}>
          Indulge in our exquisite lilac and soft lavender creations. Browse our curated pieces and fill your wardrobe with elegance.
        </p>
        <Link to="/shop" className="btn-luxury-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}>
          <span>Discover Haute Styles</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  // ORDER SUCCESS CONFIRMATION STATE
  if (orderConfirmed) {
    return (
      <div className="luxury-container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1.5px solid var(--color-secondary)'
          }}
        >
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <CheckCircle2 size={44} />
          </div>

          <h2 style={{ fontSize: '2rem', color: 'var(--color-dark)', marginBottom: '0.5rem' }}>
            Thank You For Your Order!
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem', marginBottom: '1.8rem' }}>
            Your luxury order has been confirmed and is being prepared with bespoke care.
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)',
              padding: '1.2rem',
              marginBottom: '2rem',
              textAlign: 'left',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Order Reference:</span>
              <strong style={{ color: 'var(--color-dark)' }}>{orderConfirmed.id}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Total Paid:</span>
              <strong style={{ color: 'var(--color-dark)' }}>₹{orderConfirmed.total}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Delivery To:</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', textAlign: 'right', maxWidth: '240px' }}>
                {orderConfirmed.shippingAddress}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Status:</span>
              <span className="luxury-badge badge-new">{orderConfirmed.status}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/profile" className="btn-luxury-primary" style={{ padding: '0.85rem 1.8rem' }}>
              View Order in Profile
            </Link>
            <Link to="/shop" className="btn-luxury-outline" style={{ padding: '0.85rem 1.8rem' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '0.2rem' }}>
            Your Shopping Bag
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem' }}>
            You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-danger)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: 600,
            textDecoration: 'underline'
          }}
        >
          Clear entire bag
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '1.2rem 1.5rem',
          marginBottom: '2.5rem',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <Truck size={18} color="var(--color-accent)" />
          <span style={{ fontSize: '0.92rem', color: 'var(--color-dark)', fontWeight: 600 }}>
            {amountNeededForFreeShipping === 0
              ? '✨ Congratulations! You unlocked FREE Luxury Shipping!'
              : `Add ₹${amountNeededForFreeShipping} more to qualify for FREE Shipping`}
          </span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-primary-light)', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${freeShippingProgress}%`,
              height: '100%',
              backgroundColor: 'var(--color-accent)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
      </div>

      {/* Main Grid: Cart Items List + Order Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start' }} className="cart-grid">
        
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {cart.map(item => (
            <div
              key={item.cartItemId}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.4rem',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                gap: '1.4rem',
                alignItems: 'center'
              }}
              className="cart-item-card"
            >
              {/* Product Thumbnail */}
              <Link to={`/product/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '90px',
                    height: '105px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover'
                  }}
                />
              </Link>

              {/* Item Info */}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 600 }}>
                  {item.categoryName}
                </span>
                <Link to={`/product/${item.productId}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-dark)', marginBottom: '0.35rem', fontWeight: 600 }}>
                    {item.name}
                  </h3>
                </Link>

                <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '0.8rem' }}>
                  <span>Size: <strong style={{ color: 'var(--color-dark)' }}>{item.size}</strong></span>
                  <span>•</span>
                  <span>Tone: <strong style={{ color: 'var(--color-dark)' }}>{item.color}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      style={{ width: '32px', height: '32px', border: 'none', background: 'var(--color-bg)', cursor: 'pointer', color: 'var(--color-dark)' }}
                    >
                      -
                    </button>
                    <span style={{ width: '36px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      style={{ width: '32px', height: '32px', border: 'none', background: 'var(--color-bg)', cursor: 'pointer', color: 'var(--color-dark)' }}
                    >
                      +
                    </button>
                  </div>

                  <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item.cartItemId)}
                aria-label="Remove item"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-light)',
                  cursor: 'pointer',
                  padding: '0.6rem',
                  borderRadius: '50%',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-danger)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-light)'}
              >
                <Trash2 size={19} />
              </button>
            </div>
          ))}

          <div style={{ marginTop: '0.8rem' }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1.5px solid var(--color-secondary)',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: '95px'
          }}
        >
          <h3 style={{ fontSize: '1.35rem', color: 'var(--color-dark)', marginBottom: '1.4rem' }}>
            Order Summary
          </h3>

          {/* Pricing Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Bag Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>₹{subtotal}</span>
            </div>

            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#2E7D32' }}>
                <span>Discount ({promoCode})</span>
                <span style={{ fontWeight: 600 }}>-₹{discount}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Estimated Shipping</span>
              <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>
                {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Estimated Tax (5%)</span>
              <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>₹{tax}</span>
            </div>
          </div>

          {/* Promo Code Applicator */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-dark)', display: 'block', marginBottom: '0.4rem' }}>
              Have a promotional voucher?
            </label>

            {promoCode ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-primary-light)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-secondary)' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                  ✓ {promoCode} Applied
                </span>
                <button
                  onClick={removePromoCode}
                  style={{ background: 'none', border: 'none', color: 'var(--color-danger)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="e.g. LAVENDER15"
                  style={{
                    flex: 1,
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase'
                  }}
                />
                <button
                  type="submit"
                  className="btn-luxury-secondary"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.82rem' }}
                >
                  Apply
                </button>
              </form>
            )}
            {promoError && (
              <p style={{ color: 'var(--color-danger)', fontSize: '0.76rem', marginTop: '0.35rem' }}>{promoError}</p>
            )}
          </div>

          {/* Total Amount */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.8rem', paddingTop: '0.6rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-dark)' }}>Grand Total</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark)' }}>${total}</span>
          </div>

          {/* Checkout Trigger */}
          <button
            onClick={() => setCheckoutModalOpen(true)}
            className="btn-luxury-primary"
            style={{ width: '100%', padding: '0.95rem', fontSize: '1.02rem', marginBottom: '1rem' }}
          >
            <Lock size={18} />
            <span>Proceed to Checkout</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
            <ShieldCheck size={15} color="var(--color-accent)" />
            <span>256-Bit SSL Encrypted & Guaranteed</span>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {checkoutModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(54, 32, 77, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.2rem',
              boxShadow: 'var(--shadow-lg)',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1.5px solid var(--color-secondary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.4rem' }}>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--color-dark)' }}>
                Boutique Checkout
              </h3>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder}>
              {/* Shipping Information */}
              <h4 style={{ fontSize: '0.95rem', color: 'var(--color-dark)', marginBottom: '0.8rem' }}>
                1. Delivery Address
              </h4>

              <div className="luxury-input-group">
                <label>Full Recipient Name</label>
                <input
                  type="text"
                  required
                  value={shippingForm.fullName}
                  onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                  placeholder="e.g. Aria Montgomery"
                  className="luxury-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div className="luxury-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    placeholder="aria@styleaura.com"
                    className="luxury-input"
                  />
                </div>
                <div className="luxury-input-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="luxury-input"
                  />
                </div>
              </div>

              <div className="luxury-input-group">
                <label>Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  placeholder="742 Evergreen Terrace, Suite 4B"
                  className="luxury-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div className="luxury-input-group">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="luxury-input"
                  />
                </div>
                <div className="luxury-input-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.zip}
                    onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                    className="luxury-input"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <h4 style={{ fontSize: '0.95rem', color: 'var(--color-dark)', margin: '1.2rem 0 0.8rem' }}>
                2. Payment Method
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.6rem' }}>
                {[
                  { id: 'card', label: 'Credit / Debit Card (Visa, MasterCard, Amex)' },
                  { id: 'applepay', label: 'Apple Pay / Google Pay' },
                  { id: 'cod', label: 'Cash on Delivery / Boutique Concierge' }
                ].map(m => (
                  <label
                    key={m.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: shippingForm.paymentMethod === m.id ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                      backgroundColor: shippingForm.paymentMethod === m.id ? 'var(--color-primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: 500
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={shippingForm.paymentMethod === m.id}
                      onChange={() => setShippingForm({ ...shippingForm, paymentMethod: m.id })}
                      style={{ accentColor: 'var(--color-accent)' }}
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>

              {/* Submit Order */}
              <button
                type="submit"
                className="btn-luxury-primary"
                style={{ width: '100%', padding: '0.95rem', fontSize: '1rem' }}
              >
                <span>Authorize & Pay ₹{total}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
