import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHeart, 
    faShoppingCart, 
    faStar, 
    faStarHalfAlt, 
    faCompressAlt 
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0); // Index of selected image
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const [reviews] = useState([
        { id: 1, user: "John Doe", rating: 4.5, comment: "Great product, exactly as described!", date: "2024-02-15" },
        { id: 2, user: "Jane Smith", rating: 5, comment: "Excellent quality and fast delivery!", date: "2024-02-14" },
    ]);

    useEffect(() => {
        // Check login status
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user);

        // Load wishlist
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);

        // Load compare list
        const savedCompareList = JSON.parse(localStorage.getItem('compareList')) || [];
        setCompareList(savedCompareList);

        // Fetch product data
        axios.get("/data.json")
            .then((response) => {
                const foundProduct = response.data.products.find(p => p.id === parseInt(id));
                if (foundProduct) {
                    setProduct(foundProduct);
                }
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    const handleMouseMove = (e) => {
        if (!isZoomed) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y });
    };

    const toggleWishlist = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const newWishlist = wishlist.includes(product.id)
            ? wishlist.filter(id => id !== product.id)
            : [...wishlist, product.id];
        
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const toggleCompare = () => {
        const newCompareList = compareList.includes(product.id)
            ? compareList.filter(id => id !== product.id)
            : [...compareList, product.id];
        
        setCompareList(newCompareList);
        localStorage.setItem('compareList', JSON.stringify(newCompareList));

        if (!compareList.includes(product.id)) {
            // Show success message or navigate to compare page
            alert('Product added to compare list');
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <FontAwesomeIcon 
                        key={i} 
                        icon={faStar} 
                        className="text-yellow-400" 
                    />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <FontAwesomeIcon 
                        key={i} 
                        icon={faStarHalfAlt} 
                        className="text-yellow-400" 
                    />
                );
            } else {
                stars.push(
                    <FontAwesomeIcon 
                        key={i} 
                        icon={faStar} 
                        className="text-gray-300" 
                    />
                );
            }
        }

        return stars;
    };

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Sample images array (in real app, this would come from your product data)
    const productImages = [
        product.thumbnail,
        product.images?.[0] || product.thumbnail,
        product.images?.[1] || product.thumbnail,
        product.images?.[2] || product.thumbnail,
        product.images?.[3] || product.thumbnail,
    ];

    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100 max-w-xl flex-1 order-1 md:order-2">
              <div
                className="relative aspect-square w-full max-w-[400px] mx-auto cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain rounded-lg"
                  style={{
                    transform: isZoomed ? "scale(2)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed ? "none" : "transform 0.3s ease-out",
                  }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible py-2 md:py-0">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                    ? 'border-blue-500 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-gray-600">({product.rating})</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{reviews.length} Reviews</span>
            </div>

            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                ${product.price}
              </p>
              <p className="text-green-600">
                {product.discountPercentage}% OFF
              </p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="flex space-x-4">
              <button
                onClick={() => alert("Added to cart")}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Add to Cart</span>
              </button>

              {isLoggedIn && (
                <button
                  onClick={toggleWishlist}
                  className={`p-3 rounded-lg border ${
                    wishlist.includes(product.id)
                      ? "text-red-500 border-red-500"
                      : "text-gray-400 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </button>
              )}

              <button
                onClick={toggleCompare}
                className={`p-3 rounded-lg border ${
                  compareList.includes(product.id)
                    ? "text-blue-500 border-blue-500"
                    : "text-gray-400 border-gray-300 hover:border-gray-400"
                }`}
                title="Add to Compare"
              >
                <FontAwesomeIcon icon={faCompressAlt} size="lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.user}</span>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ProductDetail; 