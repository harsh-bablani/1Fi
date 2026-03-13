import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import { useCart } from "../context/CartContext"

export default function ProductPage() {

    const { slug } = useParams()

    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedVariant, setSelectedVariant] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${slug}`)
                setProduct(res.data)

                // Default to the first available storage variant
                const firstVariant = res.data.variants?.[0]?.storage || res.data.variant || "256GB"
                setSelectedVariant(firstVariant)

                if (res.data.colors && res.data.colors.length > 0) {
                    setSelectedColor(res.data.colors[0])
                }
            } catch (err) {
                console.error(err)
                setError(err.response?.data?.message || "Failed to load product.")
            }
        }

        fetchProduct()

    }, [slug])

    if (error) {
        return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>
    }

    if (!product) {
        return <div className="text-center mt-20">Loading...</div>
    }

    const variants = product.variants ?? (product.variant ? [{ storage: product.variant, price: product.price, mrp: product.mrp }] : [])
    const activeVariant = variants.find(v => v.storage === selectedVariant) || variants[0] || { storage: selectedVariant, price: product.price, mrp: product.mrp }

    const selectedImage = product.colorImages?.find(ci => ci.color === selectedColor)?.image || product.image

    const discount = activeVariant.mrp ? Math.round(((activeVariant.mrp - activeVariant.price) / activeVariant.mrp) * 100) : 0;
    const outOfStock = activeVariant.stock === 0;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24 lg:pb-0 font-medium">
            
            {/* Header Removed as it is now in global Navbar */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    
                    {/* Vibrant Image Display (Left) */}
                    <div className="w-full lg:w-[45%]">
                        <div className="sticky top-24">
                            <div className="relative w-full aspect-[4/5] bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex items-center justify-center group overflow-hidden mb-4">
                                {/* Decorational Background Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                                
                                {/* Badges */}
                                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-md">
                                        #1 Bestseller
                                    </span>
                                    <span className="bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-md w-fit">
                                        Just Arrived
                                    </span>
                                </div>
                                {/* Wishlist Removed */}

                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-[90%] h-[90%] object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Highly Detailed & Colorful Right Section */}
                    <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pt-0">
                        
                        {/* Title & Ratings */}
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                                {product.name} <span className="text-fuchsia-600 bg-fuchsia-100 px-3 py-1 rounded-xl text-2xl ml-2 whitespace-nowrap">({selectedVariant})</span>
                            </h1>
                        </div>

                        {/* Price & Offers */}
                        <div className="bg-white rounded-[2rem] p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-[40px] opacity-70"></div>
                            
                            {/* Urgent Banner Removed */}

                            <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <p className="text-xl text-slate-400 font-bold line-through mb-1">
                                        MRP: ₹{activeVariant.mrp.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
                                            ₹{activeVariant.price.toLocaleString()}
                                        </h2>
                                        <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] font-black text-lg px-3 py-1.5 rounded-xl shadow-sm">
                                            {discount}% OFF
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1">
                                        Inclusive of all taxes <span className="bg-slate-200 text-slate-600 px-1.5 rounded text-[10px]">i</span>
                                    </p>

                                    <p className={`text-sm font-bold mt-4 ${outOfStock ? 'text-red-600' : 'text-emerald-700'}`}>
                                        {outOfStock ? 'Out of stock' : `In stock: ${activeVariant.stock}`}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Bank Offers */}
                            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                    <svg className="w-4 h-4 text-fuchsia-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Available Offers
                                </h3>
                                <ul className="text-sm font-semibold text-slate-600 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <img src="https://img.icons8.com/color/48/000000/discount--v1.png" className="w-5 h-5 flex-shrink-0" alt="offer"/>
                                        <span><strong className="text-slate-800">Bank Offer:</strong> 10% instant discount on HDFC Credit Cards, up to ₹5,000.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <img src="https://img.icons8.com/color/48/000000/discount--v1.png" className="w-5 h-5 flex-shrink-0" alt="offer"/>
                                        <span><strong className="text-slate-800">Exchange Offer:</strong> Get up to ₹25,000 off on exchange of your old phone.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Variants Box */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                            {/* Color Selector */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase flex justify-between">
                                        Color <span className="text-slate-400 capitalize">{product.colors[0]}</span>
                                    </h3>
                                    <div className="flex gap-3">
                                        {product.colors.map((color, i) => (
                                            <button key={i} onClick={() => setSelectedColor(color)} className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all ${selectedColor === color ? 'ring-[3px] ring-fuchsia-500 ring-offset-2 scale-110 shadow-md' : 'ring-1 ring-slate-200 hover:ring-fuchsia-300'}`}>
                                                <div className="w-[90%] h-[90%] rounded-full shadow-inner" style={{ backgroundColor: color }}></div>
                                                {selectedColor === color && <svg className="w-4 h-4 text-white absolute mix-blend-difference" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Storage Box */}
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase">Storage</h3>
                                <div className="flex flex-wrap gap-2">
                                    {variants.map((v) => (
                                        <button 
                                            key={v.storage}
                                            onClick={() => setSelectedVariant(v.storage)}
                                            className={`px-5 py-2.5 rounded-xl font-bold transition-colors ${selectedVariant === v.storage ? 'border-2 border-fuchsia-600 bg-fuchsia-50 text-fuchsia-700 shadow-sm relative overflow-hidden' : 'border border-slate-200 bg-white text-slate-600 hover:border-fuchsia-400 hover:text-fuchsia-600'}`}>
                                            {selectedVariant === v.storage && <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-600"></div>}
                                            {v.storage}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Highly Vibrant EMI Matrix */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
                                Select Easy EMI Plan
                                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 text-[10px] uppercase px-2 py-0.5 rounded-md font-black shadow-sm">Hot Deals</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.emiPlans?.map((plan, index) => {
                                    const isSelected = selectedPlan === index;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedPlan(index)}
                                            className={`relative overflow-hidden cursor-pointer rounded-2xl transition-all duration-300 border-[3px] p-5
                                                ${isSelected 
                                                    ? 'bg-gradient-to-br from-indigo-900 to-fuchsia-900 border-fuchsia-400 shadow-[0_10px_30px_rgba(217,70,239,0.3)] transform -translate-y-1' 
                                                    : 'bg-white border-slate-200 shadow-sm hover:border-fuchsia-300 hover:shadow-md'
                                                }`}
                                        >
                                            {/* Beautiful Radio Button */}
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className={`text-xl font-black ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                                    {plan.tenure} Months
                                                </h3>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                                    ${isSelected ? 'border-fuchsia-400 bg-fuchsia-500/20' : 'border-slate-300'}
                                                `}>
                                                    {isSelected && <div className="w-2.5 h-2.5 bg-fuchsia-400 rounded-full shadow-[0_0_10px_rgba(232,121,249,1)]" />}
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col gap-1.5">
                                                <div className={`text-3xl font-black tracking-tighter ${isSelected ? 'text-fuchsia-300' : 'text-indigo-600'}`}>
                                                    ₹{plan.monthlyPayment.toLocaleString()}
                                                    <span className={`text-sm font-bold ml-1 tracking-normal ${isSelected ? 'text-fuchsia-100/60' : 'text-slate-400'}`}>/mo</span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 mt-1">
                                                    {plan.interestRate === "0%" ? (
                                                        <span className="bg-emerald-400 text-emerald-950 text-[11px] font-black px-2 py-1 rounded shadow-sm">NO COST EMI</span>
                                                    ) : (
                                                        <span className={`text-[11px] font-bold px-2 py-1 rounded ${isSelected ? 'bg-indigo-800/50 text-indigo-200' : 'bg-slate-100 text-slate-500'}`}>{plan.interestRate} p.a.</span>
                                                    )}
                                                </div>

                                                {plan.cashback > 0 && (
                                                    <div className={`mt-2 pt-2 border-t border-dashed ${isSelected ? 'border-fuchsia-500/30' : 'border-slate-200'}`}>
                                                        <span className={`text-[11px] font-black uppercase tracking-wider flex items-center gap-1 ${isSelected ? 'text-yellow-400' : 'text-amber-600'}`}>
                                                            ★ ₹{plan.cashback.toLocaleString()} Extra Cashback
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Dual Action Buttons (Floating on Mobile) */}
                        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] lg:relative lg:p-0 lg:border-none lg:shadow-none lg:bg-transparent z-40 flex gap-3">
                            <button
                                disabled={outOfStock}
                                onClick={() => addToCart(product, null, selectedColor, activeVariant)}
                                className={`flex-1 text-amber-950 font-black text-lg py-4 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 border border-[#FF9F00]
                                    ${outOfStock ? 'bg-slate-200 cursor-not-allowed text-slate-400 border-slate-200' : 'bg-[#FF9F00] hover:bg-[#F39200]'}`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Add to Cart
                            </button>
                            <button 
                                disabled={selectedPlan === null || outOfStock}
                                onClick={() => addToCart(product, product.emiPlans[selectedPlan], selectedColor, activeVariant)}
                                className={`flex-[1.5] py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all duration-300
                                    ${selectedPlan !== null && !outOfStock 
                                        ? "bg-gradient-to-r from-[#FB641B] to-[#FF3F00] text-white shadow-xl shadow-orange-500/40 hover:-translate-y-1 active:scale-95" 
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                                    }`}
                            >
                                {selectedPlan !== null ? (
                                    <>
                                        <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        Buy with EMI
                                    </>
                                ) : "Select Plan to Buy"}
                            </button>
                        </div>

                        {/* Delivery & Trust Features */}
                        <div className="mt-8 mb-4 border border-slate-200 rounded-2xl bg-white p-5 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            <div className="flex-1 flex items-start gap-4 p-3">
                                <span className="bg-indigo-100 text-indigo-600 p-2.5 rounded-full"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></span>
                                <div>
                                    <h4 className="font-black text-slate-900 text-sm">Free Delivery</h4>
                                    <p className="text-xs font-semibold text-slate-500">Tomorrow by 11:00 AM</p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-start gap-4 p-3">
                                <span className="bg-emerald-100 text-emerald-600 p-2.5 rounded-full"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></span>
                                <div>
                                    <h4 className="font-black text-slate-900 text-sm">7 Days Replacement</h4>
                                    <p className="text-xs font-semibold text-slate-500">100% Genuine product</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}