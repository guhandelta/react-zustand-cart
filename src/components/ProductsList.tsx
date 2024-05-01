import { Link } from "react-router-dom";
import { formatCurrency, isInCart } from "../helpers";
import { products } from "../Data";
import { Product } from "../types";
import { useCartStore } from "../store";
import { useEffect, useState } from "react";

export const ProductsList = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const cartItems = useCartStore((state) => state.cartItems);
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const fetchProducts = async () => {
        // normally we would fetch products from an API
        const selectedProducts = await Promise.resolve(products);
        setSelectedProducts(selectedProducts);
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addItem({ product, quantity: 1 });
    };

    return (
        <ul className="product-list">
        {selectedProducts.map((product) => (
            <li key={product.id} className="product-card">
            <img
                src={product.imageUrl}
                alt={product.name}
                width="300"
                height="300"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{formatCurrency(product.price)}</p>
            {isInCart(cartItems, product) ? (
                <Link to="/cart">Added to cart</Link>
            ) : (
                <button onClick={() => handleAddToCart(product)}>
                + Add to cart
                </button>
            )}
            </li>
        ))}
        </ul>
    );
};