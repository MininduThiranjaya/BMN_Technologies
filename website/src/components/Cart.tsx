// // CartOverlay.tsx
// import React, { useRef, useEffect } from 'react';
// import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
// // import { useCart } from '../context/CartContext';

// const CartOverlay: React.FC = () => {
//   // const { 
//   //   cartItems, 
//   //   cartTotal, 
//   //   isCartOpen, 
//   //   closeCart, 
//   //   removeFromCart, 
//   //   increaseQuantity, 
//   //   decreaseQuantity 
//   // } = useCart();
  
//   const overlayRef = useRef<HTMLDivElement>(null);
  
//   // Close cart when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
//         closeCart();
//       }
//     };
    
//     if (isCartOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isCartOpen, closeCart]);
  
//   if (!isCartOpen) return null;
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//       <div 
//         ref={overlayRef}
//         className="bg-white w-full max-w-md my-4 mx-4 shadow-lg flex flex-col overflow-hidden"
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-bold">Your Cart ({cartItems.length})</h2>
//           <button 
//             onClick={closeCart}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>
        
//         {cartItems.length === 0 ? (
//           <div className="flex-1 flex items-center justify-center">
//             <div className="text-center p-6">
//               <ShoppingCart size={64} className="mx-auto text-gray-300" />
//               <p className="mt-4 text-gray-500">Your cart is empty</p>
//               <button 
//                 onClick={closeCart}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex-1 overflow-y-auto p-4">
//               <ul className="space-y-4">
//                 {cartItems.map((item : any, index) => (
//                   <li key={index} className="flex border-b pb-4">
//                     <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
//                       {item.image ? (
//                         <img 
//                           src={item.image} 
//                           alt={item.name} 
//                           className="w-full h-full object-cover rounded-md"
//                         />
//                       ) : (
//                         <span className="text-gray-400">IMG</span>
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <h3 className="font-medium">{item.name}</h3>
//                         <button 
//                           onClick={() => removeFromCart(item.productId)}
//                           className="text-gray-400 hover:text-red-500"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                       <p className="text-gray-500 text-sm">${item.productPrice}</p>
//                       <div className="flex items-center mt-2">
//                         <button 
//                           onClick={() => decreaseQuantity(item.productId)}
//                           className="w-8 h-8 flex items-center justify-center border rounded-l-md hover:bg-gray-100"
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <div className="w-10 h-8 flex items-center justify-center border-t border-b">
//                           {item.quantity}
//                         </div>
//                         <button 
//                           onClick={() => increaseQuantity(item.productId)}
//                           className="w-8 h-8 flex items-center justify-center border rounded-r-md hover:bg-gray-100"
//                         >
//                           <Plus size={16} />
//                         </button>
//                         <span className="ml-auto font-medium">
//                           ${(item.productPrice * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="border-t p-4">
//               <div className="flex justify-between py-2">
//                 <span className="font-medium">Subtotal</span>
//                 <span className="font-medium">${cartTotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between py-2 text-gray-500 text-sm">
//                 <span>Shipping</span>
//                 <span>Calculated at checkout</span>
//               </div>
//               <div className="flex justify-between py-2 text-lg font-bold">
//                 <span>Total</span>
//                 <span>${cartTotal.toFixed(2)}</span>
//               </div>
//               <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium">
//                 Proceed to Checkout
//               </button>
//               <button 
//                 onClick={closeCart}
//                 className="w-full mt-2 border border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartOverlay;