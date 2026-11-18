import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import { categories as defaultCategories } from '../data/categories';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('styleaura_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('styleaura_categories');
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('styleaura_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('styleaura_categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  }, [categories]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 0,
      inStock: newProduct.inStock !== undefined ? newProduct.inStock : true,
      sku: newProduct.sku || `SA-${Date.now().toString().slice(-4)}`
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
      id: categoryData.id || `cat-${Date.now()}`,
      slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const resetToDefault = () => {
    setProducts(initialProducts);
    setCategories(defaultCategories);
    localStorage.removeItem('styleaura_products');
    localStorage.removeItem('styleaura_categories');
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
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
