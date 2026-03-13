import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        API.get("/products")
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-20 font-bold text-xl text-fuchsia-600">Loading Store...</div>;

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-8">
            <h1 className="text-4xl font-black text-slate-900 mb-10 text-center">
                Explore <span className="text-fuchsia-600">1Fi Store</span>
            </h1>


            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Link to={`/products/${product.slug}`} key={product._id} className="group flex flex-col items-center bg-white rounded-3xl p-8 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:border-fuchsia-200">
                        <div className="aspect-square w-full mb-6 flex items-center justify-center p-4">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-[80%] h-[80%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">{product.name}</h2>
                        <div className="flex items-end gap-3 w-full justify-center">
                            <span className="text-3xl font-black text-fuchsia-600">₹{product.price.toLocaleString()}</span>
                            <span className="text-sm font-bold text-slate-400 line-through mb-1">₹{product.mrp.toLocaleString()}</span>
                        </div>
                        <div className="w-full mt-6 bg-slate-900 text-white text-center py-3 rounded-xl font-bold group-hover:bg-fuchsia-600 transition-colors">
                            View Offers & EMI
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
