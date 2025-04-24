// CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  itemCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook for using the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  
  // Cart overlay visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total number of items in cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Toggle cart overlay
  const toggleCart = () => setIsCartOpen(prev => !prev);
  
  // Close cart overlay
  const closeCart = () => setIsCartOpen(false);

  // Add item to cart
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  // Increase item quantity
  const increaseQuantity = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (productId: number) => {
    setCartItems(prevItems => {
      // Find the item
      const item = prevItems.find(item => item.id === productId);
      
      // If quantity will be 0, remove the item
      if (item && item.quantity <= 1) {
        return prevItems.filter(item => item.id !== productId);
      }
      
      // Otherwise, decrease the quantity
      return prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    itemCount,
    cartTotal,
    isCartOpen,
    toggleCart,
    closeCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};