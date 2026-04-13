import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, image_url, category, description } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/products/${id}`} className="product-card" id={`product-card-${id}`}>
      <div className="product-card__image-wrap">
        <img
          src={image_url || 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'}
          alt={name}
          className="product-card__image"
        />
        {category && <span className="product-card__category">{category}</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__desc">{description?.slice(0, 70)}{description?.length > 70 ? '…' : ''}</p>
        <div className="product-card__footer">
          <span className="product-card__price">₹{parseFloat(price).toFixed(2)}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            id={`add-to-cart-${id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
