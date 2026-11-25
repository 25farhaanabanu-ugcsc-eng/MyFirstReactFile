import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Sparkles, 
  FolderTree, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory } = useProducts();
  const { orders, users, updateOrderStatus } = useAuth();

  const [activeSection, setActiveSection] = useState('products'); // 'products' | 'orders' | 'categories'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Product Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // New Category State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Form State for Add / Edit Product
  const [formData, setFormData] = useState({
    name: '',
    category: 'women',
    price: 120,
    originalPrice: 160,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: '',
    sizes: 'XS, S, M, L',
    colors: 'Soft Lavender, Pastel Purple',
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    inStock: true
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalUsersCount = users.length;

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'women',
      price: 120,
      originalPrice: 160,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      description: '',
      sizes: 'XS, S, M, L',
      colors: 'Soft Lavender, Pastel Purple',
      isTrending: false,
      isNewArrival: true,
      isBestSeller: false,
      inStock: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      image: prod.image,
      description: prod.description || '',
      sizes: prod.sizes ? prod.sizes.join(', ') : 'S, M, L',
      colors: prod.colors ? prod.colors.map(c => c.name).join(', ') : 'Soft Lavender',
      isTrending: !!prod.isTrending,
      isNewArrival: !!prod.isNewArrival,
      isBestSeller: !!prod.isBestSeller,
      inStock: prod.inStock !== false
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedCategoryObj = categories.find(c => c.id === formData.category);
    const categoryName = selectedCategoryObj ? selectedCategoryObj.name : "Women's Wear";

    const parsedSizes = formData.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const parsedColors = formData.colors.split(',').map(c => ({
      name: c.trim(),
      hex: '#C5A5E8'
    })).filter(c => c.name);

    const payload = {
      name: formData.name,
      category: formData.category,
      categoryName,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      image: formData.image,
      gallery: [formData.image],
      description: formData.description,
      sizes: parsedSizes,
      colors: parsedColors,
      isTrending: formData.isTrending,
      isNewArrival: formData.isNewArrival,
      isBestSeller: formData.isBestSeller,
      inStock: formData.inStock
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory({
        name: newCatName.trim(),
        description: newCatDesc.trim() || 'Curated fashion department',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
      });
      setNewCatName('');
      setNewCatDesc('');
    }
  };

  // Filtered products in table
  const displayedProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      
      {/* 1. OVERVIEW STATS CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-dark)' }}>
            <DollarSign size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Total Revenue</span>
            <h3 style={{ fontSize: '1.7rem', color: 'var(--color-dark)', margin: 0 }}>${totalRevenue}</h3>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
            <Package size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Total Products</span>
            <h3 style={{ fontSize: '1.7rem', color: 'var(--color-dark)', margin: 0 }}>{totalProducts}</h3>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#EDE7F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6A1B9A' }}>
            <ShoppingBag size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Total Orders</span>
            <h3 style={{ fontSize: '1.7rem', color: 'var(--color-dark)', margin: 0 }}>{totalOrders}</h3>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#F3E5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8E24AA' }}>
            <Users size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>Registered Users</span>
            <h3 style={{ fontSize: '1.7rem', color: 'var(--color-dark)', margin: 0 }}>{totalUsersCount}</h3>
          </div>
        </div>
      </div>

      {/* 2. SECTION TABS */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        {[
          { id: 'products', label: 'Manage Products', icon: <Package size={17} /> },
          { id: 'orders', label: `Manage Orders (${orders.length})`, icon: <ShoppingBag size={17} /> },
          { id: 'categories', label: `Manage Categories (${categories.length})`, icon: <FolderTree size={17} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.4rem',
              background: 'none',
              border: 'none',
              borderBottom: activeSection === tab.id ? '2.5px solid var(--color-accent)' : '2.5px solid transparent',
              color: activeSection === tab.id ? 'var(--color-dark)' : 'var(--color-text-muted)',
              fontWeight: activeSection === tab.id ? 700 : 500,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SECTION 1: MANAGE PRODUCTS */}
      {activeSection === 'products' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '1.8rem', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          {/* Action Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.8rem', flex: 1, maxWidth: '500px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={17} color="var(--color-text-light)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products by name..."
                  className="luxury-input"
                  style={{ paddingLeft: '2.5rem', paddingBottom: '0.65rem', paddingTop: '0.65rem', marginBottom: 0 }}
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                style={{
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-dark)',
                  fontSize: '0.88rem'
                }}
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOpenAdd}
              className="btn-luxury-primary"
              style={{ padding: '0.75rem 1.4rem' }}
            >
              <Plus size={18} />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Item</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Category</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Price</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Rating</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Stock Status</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map(prod => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid var(--color-neutral-light)' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{ width: '45px', height: '52px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ color: 'var(--color-dark)', display: 'block', fontSize: '0.92rem' }}>{prod.name}</strong>
                          <span style={{ fontSize: '0.74rem', color: 'var(--color-text-light)' }}>SKU: {prod.sku}</span>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', color: 'var(--color-text-muted)' }}>
                      <span className="luxury-badge badge-new" style={{ fontSize: '0.7rem' }}>
                        {prod.categoryName}
                      </span>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                      ₹{prod.price}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', color: 'var(--color-text-main)' }}>
                      ★ {prod.rating} ({prod.reviewsCount})
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: prod.inStock ? '#2E7D32' : '#C2185B'
                      }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: prod.inStock ? '#2E7D32' : '#C2185B' }} />
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          title="Edit product"
                          style={{
                            background: 'none',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            padding: '0.4rem',
                            cursor: 'pointer',
                            color: 'var(--color-dark)'
                          }}
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          title="Delete product"
                          style={{
                            background: 'none',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            padding: '0.4rem',
                            cursor: 'pointer',
                            color: 'var(--color-danger)'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: MANAGE ORDERS */}
      {activeSection === 'orders' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '1.8rem', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-dark)', marginBottom: '1.4rem' }}>
            Customer Orders Management
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Order ID</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Customer</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Date</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Items</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Total</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Status</th>
                  <th style={{ padding: '0.9rem 1rem', color: 'var(--color-dark)' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(ord => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-neutral-light)' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                      {ord.id}
                    </td>

                    <td style={{ padding: '0.9rem 1rem' }}>
                      <strong style={{ display: 'block', color: 'var(--color-dark)' }}>{ord.customerName}</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--color-text-light)' }}>{ord.customerEmail}</span>
                    </td>

                    <td style={{ padding: '0.9rem 1rem', color: 'var(--color-text-muted)' }}>
                      {ord.date}
                    </td>

                    <td style={{ padding: '0.9rem 1rem', color: 'var(--color-text-muted)' }}>
                      {ord.items?.length || 1} items
                    </td>

                    <td style={{ padding: '0.9rem 1rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                      ₹{ord.total}
                    </td>

                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span className={`luxury-badge ${ord.status === 'Delivered' ? 'badge-new' : 'badge-trending'}`}>
                        {ord.status}
                      </span>
                    </td>

                    <td style={{ padding: '0.9rem 1rem' }}>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        style={{
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          border: '1px solid var(--color-secondary)',
                          backgroundColor: 'var(--color-primary-light)',
                          color: 'var(--color-dark)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: MANAGE CATEGORIES */}
      {activeSection === 'categories' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Categories List */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '1.8rem', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-dark)', marginBottom: '1.2rem' }}>
              Active Departments ({categories.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {categories.map(c => {
                const count = products.filter(p => p.category === c.id).length;
                return (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      onError={(e) => { if (c.fallbackImage) e.target.src = c.fallbackImage; }}
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.98rem', color: 'var(--color-dark)', margin: 0 }}>{c.name}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>{count} items active</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Category Form */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '1.8rem', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-dark)', marginBottom: '1.2rem' }}>
              Add New Department
            </h3>

            <form onSubmit={handleAddCategorySubmit}>
              <div className="luxury-input-group">
                <label>Category Title</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Resort & Cruise Wear"
                  className="luxury-input"
                />
              </div>

              <div className="luxury-input-group">
                <label>Short Description</label>
                <textarea
                  rows="3"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Sun-drenched silhouettes, lightweight caftans..."
                  className="luxury-input"
                />
              </div>

              <button type="submit" className="btn-luxury-primary" style={{ width: '100%' }}>
                <Plus size={16} />
                <span>Create Department</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(54, 32, 77, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 3500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.2rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1.5px solid var(--color-secondary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-dark)' }}>
                {editingProduct ? 'Edit Haute Piece' : 'Add New Boutique Style'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="luxury-input-group">
                <label>Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Lavender Organza Cocktail Dress"
                  className="luxury-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="luxury-input-group">
                  <label>Department Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="luxury-input"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="luxury-input-group">
                  <label>Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="luxury-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="luxury-input-group">
                  <label>Original Price (Optional strikethrough)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="e.g. 180"
                    className="luxury-input"
                  />
                </div>

                <div className="luxury-input-group">
                  <label>Image URL (or /dress1.png, /dress2.png)</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="luxury-input"
                  />
                </div>
              </div>

              <div className="luxury-input-group">
                <label>Sizes (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  placeholder="XS, S, M, L, XL"
                  className="luxury-input"
                />
              </div>

              <div className="luxury-input-group">
                <label>Color Swatches (Comma-separated names)</label>
                <input
                  type="text"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  placeholder="Soft Lavender, Pastel Purple, Deep Plum"
                  className="luxury-input"
                />
              </div>

              <div className="luxury-input-group">
                <label>Couture Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Crafted with pure silk and delicate artisanal drape..."
                  className="luxury-input"
                />
              </div>

              {/* Badges / Checkboxes */}
              <div style={{ display: 'flex', gap: '1.2rem', margin: '1rem 0 1.6rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  <span>Trending</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  <span>New Arrival</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  <span>Best Seller</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-luxury-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-primary"
                >
                  {editingProduct ? 'Save Updates' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(54, 32, 77, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 4000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFEBEE', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <AlertCircle size={26} />
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>
              Confirm Product Removal
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '1.6rem' }}>
              Are you certain you want to remove this piece from the boutique? This action cannot be reversed.
            </p>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn-luxury-outline"
                style={{ flex: 1 }}
              >
                Keep Item
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn-luxury-primary"
                style={{ flex: 1, backgroundColor: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
