import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, plan, color, variant) => {
        const selectedStorage = typeof variant === 'string' ? variant : variant?.storage;
        const selectedPrice = variant?.price ?? product.price;
        const selectedMrp = variant?.mrp ?? product.mrp;

        setCartItems(prev => [...prev, {
            ...product,
            price: selectedPrice,
            mrp: selectedMrp,
            selectedPlan: plan,
            selectedColor: color,
            selectedStorage,
            selectedVariant: variant,
            cartItemId: Date.now()
        }]);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.cartItemId !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
