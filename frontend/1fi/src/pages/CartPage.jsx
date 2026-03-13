import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { cartItems, removeFromCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
                <h2 className="text-3xl font-black text-slate-800 mb-4">Your Cart is Empty</h2>
                <Link to="/" className="bg-fuchsia-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-fuchsia-700 transition">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 mb-8">Your Cart</h1>
                <div className="flex flex-col gap-4">
                    {cartItems.map(item => (
                        <div key={item.cartItemId} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-slate-900">{item.name}</h3>
                                <p className="text-sm text-slate-500 font-bold mb-2">Variant: {item.selectedVariant?.storage || item.selectedStorage} | Color: {item.selectedColor}</p>
                                {item.selectedPlan ? (
                                    <div className="bg-fuchsia-50 text-fuchsia-800 p-2 rounded-lg inline-block text-sm font-bold">
                                        EMI: ₹{item.selectedPlan.monthlyPayment}/mo for {item.selectedPlan.tenure} months
                                    </div>
                                ) : (
                                    <div className="text-slate-800 font-black">Full Price: ₹{item.price.toLocaleString()}</div>
                                )}
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg font-bold transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
