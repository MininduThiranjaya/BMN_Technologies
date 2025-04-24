
// CartButton.tsx
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartButton: React.FC = () => {
  const { itemCount, toggleCart } = useCart();
  
  return (
    <button 
      className="relative flex items-center justify-center focus:outline-none"
      onClick={toggleCart}
      aria-label="Open shopping cart"
    >
      <ShoppingCart size={24} className="text-gray-700 hover:text-gray-900" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;