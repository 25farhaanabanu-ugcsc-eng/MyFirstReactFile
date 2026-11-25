import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Package, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  Check, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Profile() {
  const { currentUser, orders, logout, updateProfile, isAdmin } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'wishlist'
  const [isEditing, setIsEditing] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');

  const [editFormData, setEditFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  });

  if (!currentUser) {
    return (
      <div className="luxury-container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Sign in to view your profile</h2>
        <p style={{ margin: '1rem 0 2rem' }}>Please log in to manage your orders, saved pieces and account details.</p>
        <Link to="/login" className="btn-luxury-primary">Sign In</Link>
      </div>
    );
  }

  // Filter orders for the current user
  const userOrders = orders.filter(o => 
    o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
    isAdmin // Admin can see all or their own
  );

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(editFormData);
    setIsEditing(false);
    setProfileSuccess('Profile details updated successfully!');
    setTimeout(() => setProfileSuccess(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="luxury-container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      
      {/* Top Banner / User Summary Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          marginBottom: '2.5rem',
          border: '1px solid var(--color-secondary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #FFFFFF',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
              <h1 style={{ fontSize: '1.8rem', color: 'var(--color-dark)' }}>
                {currentUser.name}
              </h1>
              <span className="luxury-badge badge-new">
                VIP Client
              </span>
            </div>
            <p style={{ color: 'var(--color-text-main)', fontSize: '0.9rem', margin: 0 }}>
              {currentUser.email} • Member since {currentUser.joinedDate || '2024'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleLogout}
            className="btn-luxury-outline"
            style={{ padding: '0.7rem 1.4rem', fontSize: '0.88rem', borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {profileSuccess && (
        <div style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid #C8E6C9' }}>
          {profileSuccess}
        </div>
      )}

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem' }}>
        {[
          { id: 'orders', label: `Order History (${userOrders.length})`, icon: <Package size={17} /> },
          { id: 'profile', label: 'Account Information', icon: <User size={17} /> },
          { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: <Heart size={17} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.85rem 1.4rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2.5px solid var(--color-accent)' : '2.5px solid transparent',
              color: activeTab === tab.id ? 'var(--color-dark)' : 'var(--color-text-muted)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '0.94rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div>
          {userOrders.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '4rem 2rem', textAlign: 'center', border: '1px solid var(--color-border-subtle)' }}>
              <Package size={48} color="var(--color-secondary)" style={{ margin: '0 auto 1.2rem' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>No orders placed yet</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>Your bespoke fashion acquisitions will appear here.</p>
              <Link to="/shop" className="btn-luxury-primary">Explore Boutique</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {userOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.6rem 2rem',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-neutral-light)' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 600 }}>Order ID</span>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--color-dark)', margin: 0 }}>{order.id}</h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        <Calendar size={15} color="var(--color-accent)" />
                        <span>{order.date}</span>
                      </div>

                      <span className={`luxury-badge ${order.status === 'Delivered' ? 'badge-new' : 'badge-trending'}`}>
                        {order.status}
                      </span>

                      <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                        ₹{order.total}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                          <span style={{ color: 'var(--color-text-main)' }}>
                            <strong>{item.quantity}x</strong> {item.name} {item.size && `(${item.size})`} {item.color && `• ${item.color}`}
                          </span>
                          <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.8rem', borderTop: '1px solid var(--color-neutral-light)', fontSize: '0.82rem', color: 'var(--color-text-light)', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span>Paid via: {order.paymentMethod}</span>
                    <span>Delivered to: {order.shippingAddress}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROFILE DETAILS & EDIT */}
      {activeTab === 'profile' && (
        <div style={{ maxWidth: '640px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-dark)' }}>Account Settings</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-luxury-outline"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                >
                  <Edit3 size={14} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileSave}>
                <div className="luxury-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="luxury-input"
                  />
                </div>

                <div className="luxury-input-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="luxury-input"
                  />
                </div>

                <div className="luxury-input-group">
                  <label>Shipping Address</label>
                  <input
                    type="text"
                    value={editFormData.address}
                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                    placeholder="Street, City, State, ZIP"
                    className="luxury-input"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.4rem' }}>
                  <button type="submit" className="btn-luxury-primary" style={{ padding: '0.75rem 1.6rem' }}>
                    <Check size={16} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-luxury-outline"
                    style={{ padding: '0.75rem 1.4rem' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0', borderBottom: '1px solid var(--color-neutral-light)' }}>
                  <User size={18} color="var(--color-accent)" />
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'block' }}>Name</span>
                    <strong style={{ color: 'var(--color-dark)' }}>{currentUser.name}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0', borderBottom: '1px solid var(--color-neutral-light)' }}>
                  <Mail size={18} color="var(--color-accent)" />
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'block' }}>Email</span>
                    <strong style={{ color: 'var(--color-dark)' }}>{currentUser.email}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0', borderBottom: '1px solid var(--color-neutral-light)' }}>
                  <Phone size={18} color="var(--color-accent)" />
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'block' }}>Phone</span>
                    <strong style={{ color: 'var(--color-dark)' }}>{currentUser.phone || 'Not added yet'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0' }}>
                  <MapPin size={18} color="var(--color-accent)" />
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'block' }}>Default Shipping Address</span>
                    <strong style={{ color: 'var(--color-dark)' }}>{currentUser.address || 'Not added yet'}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED WISHLIST PREVIEW */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '4rem 2rem', textAlign: 'center', border: '1px solid var(--color-border-subtle)' }}>
              <Heart size={44} color="var(--color-secondary)" style={{ margin: '0 auto 1.2rem' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>No wishlist items yet</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>Click the heart icon on any product to save it here.</p>
              <Link to="/shop" className="btn-luxury-primary">Browse Catalog</Link>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <Link to="/wishlist" className="btn-luxury-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Open Full Wishlist Page →
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.4rem' }}>
                {wishlist.map(product => (
                  <div key={product.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.6rem' }} />
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--color-dark)', marginBottom: '0.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                    <p style={{ fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.8rem' }}>₹{product.price}</p>
                    <Link to={`/product/${product.id}`} className="btn-luxury-secondary" style={{ width: '100%', padding: '0.45rem', fontSize: '0.78rem' }}>
                      View Piece
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
