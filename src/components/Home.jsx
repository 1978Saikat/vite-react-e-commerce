import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check login status
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user);

        // Load wishlist from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);

        // Fetch products
        axios
            .get("/data.json")
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleChangePage = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    const toggleWishlist = (productId) => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const newWishlist = wishlist.includes(productId)
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];
        
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = products.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {paginatedItems.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-2 sm:p-4 relative group">
                        {/* Wishlist Icon */}
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 p-1.5 sm:p-2 rounded-full bg-white shadow-md 
                                transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={`text-base sm:text-xl transition-colors duration-300 ${
                                    wishlist.includes(product.id) 
                                    ? 'text-red-500' 
                                    : 'text-gray-400 hover:text-red-500'
                                }`}
                            />
                        </button>

                        {/* Product Link */}
                        <Link to={`/product/${product.id}`} className="block">
                            {/* Product Image */}
                            <div className="relative aspect-square mb-2 sm:mb-4">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="space-y-1 sm:space-y-2">
                                <h2 className="text-sm sm:text-lg font-bold truncate" title={product.title}>
                                    {product.title}
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2" title={product.description}>
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm sm:text-lg font-bold">${product.price}</p>
                                        <p className="text-xs sm:text-sm text-green-600">
                                            {product.discountPercentage}% off
                                        </p>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add to cart logic here
                                        }}
                                        className="p-1.5 sm:p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} className="text-sm sm:text-lg" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 sm:mt-8">
                <Pagination
                    page={page}
                    count={Math.ceil(products.length / itemsPerPage)}
                    onChange={handleChangePage}
                    color="primary"
                    size="small"
                    className="scale-75 sm:scale-100"
                />
            </div>
        </div>
    );
};

export default Home;

