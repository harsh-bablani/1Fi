import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { cartItems } = useCart();

    return (
        <header className="sticky top-0 w-full z-50 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="font-extrabold text-2xl text-white tracking-widest drop-shadow-md cursor-pointer hover:scale-105 transition-transform">
                    STORE
                </Link>
                <div className="flex gap-4 text-white">
                    <Link to="/cart" className="hover:text-fuchsia-200 transition-colors relative flex items-center">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
