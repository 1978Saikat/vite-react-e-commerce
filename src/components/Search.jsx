import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    setLoading(true);

    const filtered = products.filter((product) => {
      const productName = product.title.toLowerCase();
      const productDescription = product.description.toLowerCase();
      const searchQuery = searchTerm.toLowerCase();
      
      // Category filter
      if (category && product.category !== category) return false;
      
      // Price range filter
      if (priceRange) {
        const price = parseFloat(product.price);
        switch (priceRange) {
          case "0-50":
            if (price > 50) return false;
            break;
          case "50-100":
            if (price < 50 || price > 100) return false;
            break;
          case "100-200":
            if (price < 100 || price > 200) return false;
            break;
          case "200+":
            if (price < 200) return false;
            break;
          default:
            break;
        }
      }

      // Search term filter
      return searchQuery === "" || 
             productName.includes(searchQuery) || 
             productDescription.includes(searchQuery);
    });

    setFilteredProducts(filtered);
    setTimeout(() => setLoading(false), 500); // Simulate loading for better UX
  };

  const clearFilters = () => {
    setCategory("");
    setPriceRange("");
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses"
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto py-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <div className="relative flex-1">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="ml-2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={faFilter} className="text-xl" />
            </button>
          </div>

          {/* Filters */}
          <div className={`transition-all duration-300 space-y-4 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear All
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </form>

        {/* Search Results */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Search Results ({filteredProducts.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square mb-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <h4 className="font-semibold text-lg mb-1 truncate" title={product.title}>
                    {product.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2" title={product.description}>
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price}</span>
                    <span className="text-green-600 text-sm">
                      {product.discountPercentage}% off
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchTerm || category || priceRange ? (
          <div className="text-center py-8 text-gray-500">
            No products found matching your criteria
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
