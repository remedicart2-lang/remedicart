import { useEffect, useState, useRef } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, searchProducts, uploadProductImage } from '../services/productService';
import './AdminProducts.css';

const CATEGORIES = ['Tablets', 'Syrups', 'Capsules', 'Vitamins', 'Skincare', 'Devices', 'Drop-shipping'];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tablets',
    description: '',
    content: '',
    sideEffect: '',
    stock: true,
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fileInputRef = useRef(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery) {
        try {
          const results = await searchProducts(searchQuery);
          setProducts(results);
        } catch (err) {
          console.error(err);
        }
      } else {
        fetchProducts();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Tablets',
      description: '',
      content: '',
      sideEffect: '',
      stock: true,
      imageUrl: ''
    });
    setSelectedFile(null);
    setEditId(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      let finalImageUrl = formData.imageUrl;

      // 1. Upload image if a new one is selected
      if (selectedFile) {
        finalImageUrl = await uploadProductImage(selectedFile);
      }

      const payload = {
        ...formData,
        imageUrl: finalImageUrl
      };

      // 2. Insert or Update
      if (editId) {
        await updateProduct(editId, payload);
        setSuccess('Product updated successfully!');
      } else {
        await addProduct(payload);
        setSuccess('Product added successfully!');
      }

      // 3. Reset and back to list
      setTimeout(() => {
        setSuccess('');
        setView('list');
        resetForm();
        fetchProducts();
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name || '',
      category: product.category || 'Tablets',
      description: product.description || '',
      content: product.content || '',
      sideEffect: product.sideEffect || '',
      stock: product.stock ?? true,
      imageUrl: product.imageUrl || ''
    });
    setView('form');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  if (view === 'form') {
    return (
      <div className="admin-form-view">
        <div className="admin-view-header">
          <button className="btn btn-back" onClick={() => { setView('list'); resetForm(); }}>
            ← Back
          </button>
        </div>
        
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <h2 className="admin-form-card__title">
              <span className="plus-icon">+</span> {editId ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter product name" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange} 
                  accept="image/*"
                  className="file-input"
                />
                {formData.imageUrl && !selectedFile && (
                  <p className="file-hint">Current: {formData.imageUrl.split('/').pop()}</p>
                )}
              </div>

              <div className="form-group span-2">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Enter description"
                  rows={4}
                />
              </div>

              <div className="form-group span-2">
                <label>Content</label>
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleInputChange} 
                  placeholder="Enter content details"
                  rows={4}
                />
              </div>

              <div className="form-group span-2">
                <label>Side Effects</label>
                <textarea 
                  name="sideEffect" 
                  value={formData.sideEffect} 
                  onChange={handleInputChange} 
                  placeholder="Enter side effects"
                  rows={4}
                />
              </div>
            </div>

            <div className="form-checkbox-group">
              <input 
                type="checkbox" 
                id="stock" 
                name="stock" 
                checked={formData.stock} 
                onChange={handleInputChange} 
              />
              <label htmlFor="stock">Available in stock</label>
            </div>

            <button type="submit" className="btn btn-submit" disabled={saving}>
              {saving ? 'Processing...' : editId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-list-view">
      <div className="dashboard-header">
        <div className="dashboard-header__left">
          <h1 className="dashboard-title">
            <span className="package-icon">📦</span> Product Dashboard
          </h1>
          <p className="dashboard-subtitle">Manage all products from one place.</p>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search products by name or content..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-add" onClick={() => setView('form')}>
          + Add New Product
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>AVAILABILITY</th>
              <th>DESCRIPTION</th>
              <th>CONTENT</th>
              <th>SIDE EFFECTS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" className="text-center">Loading products...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="8" className="text-center">No products found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img 
                      src={p.imageUrl || 'https://placehold.co/50x50?text=No+Img'} 
                      alt={p.name} 
                      className="table-img" 
                    />
                  </td>
                  <td className="font-semibold">{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    <span className={`status-badge ${p.stock ? 'in-stock' : 'out-of-stock'}`}>
                      {p.stock ? 'Available' : 'Out of stock'}
                    </span>
                  </td>
                  <td className="text-truncate">{p.description}</td>
                  <td className="text-truncate">{p.content}</td>
                  <td className="text-truncate">{p.sideEffect}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(p)}>
                        📝 Edit
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(p.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
