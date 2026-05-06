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

  const category = searchParams.get('category') || 'best-seller';
  const search = searchParams.get('search') || '';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (search) {
        data = await searchProducts(search);
      } else if (category && category !== 'all') {
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
    <div className="shop-page">
      <div className="container">
        <div className="shop-layout">
          {/* Sidebar */}
          <aside className="shop-sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <CategoryFilter selected={category} onChange={handleCategoryChange} />
          </aside>

          {/* Main Content */}
          <main className="shop-content">
            <div className="product-listing__header">
              <div className="header-info">
                <h1 className="shop-title">
                  {search ? `Results for "${search}"` : category ? `${category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}` : 'Products'}
                </h1>
                <p className="shop-count">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
              </div>
              <div className="product-listing__search">
                <SearchBar initialQuery={search} />
              </div>
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
                <p>Try a different search term or browse other categories.</p>
              </div>
            ) : (
              <div className="grid grid-3">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
