import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl, category, description } = product;

  const handleInquiry = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry about ${product.name}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to know more about ${product.name}.\n\nThank you.`
    );

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=remedicart2@gmail.com&su=${subject}&body=${body}`;
    const mailtoLink = `mailto:medclickpharma@gmail.com?subject=${subject}&body=${body}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(isMobile ? mailtoLink : gmailLink, "_blank");
  };

  return (
    <Link to={`/products/${id}`} className="product-card" id={`product-card-${id}`}>
      <div className="product-card__image-wrap">
        <img
          src={imageUrl || 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'}
          alt={name}
          className="product-card__image"
        />
        {category && <span className="product-card__category">{category}</span>}
        <span className="product-card__sale">Sale!</span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__desc">{description?.slice(0, 70)}{description?.length > 70 ? '…' : ''}</p>
        <div className="product-card__footer">
          <button
            onClick={handleInquiry}
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
