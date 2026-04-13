import { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import './AdminProducts.css';

const EMPTY_FORM = { name: '', description: '', price: '', image_url: '', category: 'tablets' };
const CATEGORIES = ['tablets', 'syrups', 'capsules', 'vitamins', 'skincare', 'devices'];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try { setProducts(await getProducts()); }
    catch (e) { setError('Failed to load products.'); console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = { ...form, price: parseFloat(form.price) };
      if (editId) {
        await updateProduct(editId, payload);
        setSuccess('Product updated successfully!');
      } else {
        await addProduct(payload);
        setSuccess('Product added successfully!');
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      setShowForm(false);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      image_url: product.image_url || '',
      category: product.category || 'tablets',
    });
    setShowForm(true);
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setSuccess('Product deleted.');
      await fetchProducts();
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
    setError('');
    setSuccess('');
  };

  return (
    <div>
      <div className="admin-products__header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub">Manage your medicine catalogue</p>
        </div>
        {!showForm && (
          <button className="btn btn-teal" onClick={() => setShowForm(true)} id="admin-add-product-btn">
            + Add Product
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Product Form */}
      {showForm && (
        <div className="admin-form-card">
          <h2 className="admin-form-title">{editId ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="admin-product-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-name">Product Name *</label>
                <input id="admin-product-name" name="name" type="text" className="form-input" value={form.name} onChange={handleChange} required placeholder="e.g. Paracetamol 500mg" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-price">Price (₹) *</label>
                <input id="admin-product-price" name="price" type="number" step="0.01" min="0" className="form-input" value={form.price} onChange={handleChange} required placeholder="e.g. 49.99" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-category">Category</label>
                <select id="admin-product-category" name="category" className="form-input" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-image">Image URL</label>
                <input id="admin-product-image" name="image_url" type="url" className="form-input" value={form.image_url} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-product-desc">Description</label>
              <textarea id="admin-product-desc" name="description" className="form-input" rows={3} value={form.description} onChange={handleChange} placeholder="Describe the product..." />
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving} id="admin-product-save-btn">
                {saving ? 'Saving…' : editId ? 'Update Product' : 'Add Product'}
              </button>
              <button type="button" className="btn btn-outline" onClick={handleCancelForm} id="admin-product-cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="loading-wrapper"><div className="spinner" /></div>
      ) : products.length === 0 ? (
        <div className="admin-empty">No products yet. Add your first product above.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} id={`admin-product-row-${p.id}`}>
                  <td>
                    <div className="admin-table__product">
                      <img src={p.image_url || 'https://placehold.co/48x48/e2e8f0/64748b?text=Rx'} alt={p.name} className="admin-table__product-img" />
                      <div>
                        <p className="admin-table__product-name">{p.name}</p>
                        <p className="admin-table__product-desc">{p.description?.slice(0, 50)}…</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-teal">{p.category}</span></td>
                  <td className="admin-table__price">₹{parseFloat(p.price).toFixed(2)}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="btn btn-outline btn-sm" onClick={() => handleEdit(p)} id={`admin-edit-${p.id}`}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)} id={`admin-delete-${p.id}`}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
