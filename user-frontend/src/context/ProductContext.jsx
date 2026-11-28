import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../services/api';

const ProductContext = createContext();

const normalizeProduct = (p) => ({
  ...p,
  id: p.id || p._id,
});

const normalizeCategory = (c) => ({
  ...c,
  id: c.id || c._id,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatalog = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodData, catData] = await Promise.all([
        apiRequest('/api/products'),
        apiRequest('/api/categories'),
      ]);
      const prodList = Array.isArray(prodData) ? prodData : (prodData.products || []);
      const catList = Array.isArray(catData) ? catData : (catData.categories || []);
      setProducts(prodList.map(normalizeProduct));
      setCategories(catList.map(normalizeCategory));
    } catch (err) {
      console.error('Failed to fetch catalog from backend:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `prod-₹{Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 0,
      inStock: newProduct.inStock !== undefined ? newProduct.inStock : true,
      sku: newProduct.sku || `SA-₹{Date.now().toString().slice(-4)}`
    };
    setProducts(prev => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const addCategory = (categoryData) => {
    const newCat = {
      ...categoryData,
      id: categoryData.id || `cat-₹{Date.now()}`,
      slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const resetToDefault = () => {
    fetchCatalog();
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      error,
      refreshCatalog: fetchCatalog,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      addCategory,
      resetToDefault
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
