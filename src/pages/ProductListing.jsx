import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { getProducts, getProductsByCategory, searchProducts } from '../services/productService';
import './ProductListing.css';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (search) {
        data = await searchProducts(search);
      } else if (category) {
        data = await getProductsByCategory(category);
      } else {
        data = await getProducts();
      }
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleCategoryChange = (val) => {
    const params = {};
    if (val) params.category = val;
    setSearchParams(params);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Page Header */}
        <div className="product-listing__header">
          <div>
            <h1 className="section-title">
              {search ? `Results for "${search}"` : category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
            </h1>
            <p className="section-subtitle">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="product-listing__search">
            <SearchBar initialQuery={search} />
          </div>
        </div>

        {/* Category Filter */}
        <div className="product-listing__filters">
          <CategoryFilter selected={category} onChange={handleCategoryChange} />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading-wrapper"><div className="spinner" /></div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : products.length === 0 ? (
          <div className="product-listing__empty">
            <span>🔍</span>
            <h3>No products found</h3>
            <p>Try a different search term or browse all categories.</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
