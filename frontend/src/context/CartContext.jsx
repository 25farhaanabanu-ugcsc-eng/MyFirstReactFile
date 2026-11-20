import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('styleaura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('styleaura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, size = 'M', color = null, quantity = 1) => {
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    const selectedSize = size || (product.sizes && product.sizes[0] ? product.sizes[0] : 'Standard');
    const cartItemId = `₹{product.id}-₹{selectedSize}-₹{selectedColor}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            categoryName: product.categoryName,
            size: selectedSize,
            color: selectedColor,
            quantity: Math.max(1, quantity)
          }
        ];
      }
    });

    showToast(`Added ₹{quantity}x "₹{product.name}" (₹{selectedSize}) to Cart`);
  };

  const removeFromCart = (cartItemId) => {
    const item = cart.find(i => i.cartItemId === cartItemId);
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
    if (item) {
      showToast(`Removed "₹{item.name}" from Cart`);
    }
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
  };

  const applyPromoCode = (code) => {
    const cleaned = (code || '').trim().toUpperCase();
    if (cleaned === 'LAVENDER15') {
      setPromoCode(cleaned);
      setDiscountPercent(15);
      setFlatDiscount(0);
      showToast('Promo code LAVENDER15 applied: 15% OFF!');
      return { success: true, message: '15% discount applied successfully!' };
    } else if (cleaned === 'STYLE10') {
      setPromoCode(cleaned);
      setDiscountPercent(10);
      setFlatDiscount(0);
      showToast('Promo code STYLE10 applied: 10% OFF!');
      return { success: true, message: '10% discount applied successfully!' };
    } else if (cleaned === 'PURPLE20') {
      setPromoCode(cleaned);
      setDiscountPercent(0);
      setFlatDiscount(20);
      showToast('Promo code PURPLE20 applied: $20 OFF!');
      return { success: true, message: '₹20 discount applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try LAVENDER15 or STYLE10' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
    showToast('Promo code removed');
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  let calculatedDiscount = 0;
  if (discountPercent > 0) {
    calculatedDiscount = Math.round((subtotal * discountPercent) / 100);
  } else if (flatDiscount > 0) {
    calculatedDiscount = Math.min(flatDiscount, subtotal);
  }

  // Free shipping over $100
  const freeShippingThreshold = 100;
  const shipping = subtotal === 0 ? 0 : (subtotal >= freeShippingThreshold ? 0 : 15);
  const tax = subtotal === 0 ? 0 : Math.round((subtotal - calculatedDiscount) * 0.05);
  const total = Math.max(0, subtotal - calculatedDiscount + shipping + tax);

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      subtotal,
      shipping,
      freeShippingThreshold,
      tax,
      discount: calculatedDiscount,
      total,
      promoCode,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromoCode,
      removePromoCode,
      cartToast: toastMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
