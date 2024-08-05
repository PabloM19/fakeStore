import React, { createContext, useReducer, useContext } from 'react';

// Inicializa el estado del carrito
const initialState = { cart: [] };

// Define el reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Lógica para añadir al carrito
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { productId: action.payload.productId, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      // Lógica para remover del carrito
      const itemToRemove = state.cart.find(item => item.productId === action.payload.productId);
      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          return {
            ...state,
            cart: state.cart.map(item =>
              item.productId === action.payload.productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          };
        } else {
          return {
            ...state,
            cart: state.cart.filter(item => item.productId !== action.payload.productId)
          };
        }
      }
      return state;
    default:
      return state;
  }
};

// Crea el contexto
const CartContext = createContext();

// Crea un proveedor de contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);
