import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img src={logo} alt="Remedicart" className="footer__logo" />
            <p className="footer__tagline">Simplifying the way you buy medicines. Fast, reliable, and always stocked.</p>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Shop</h4>
            <ul className="footer__list">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=tablets">Tablets</Link></li>
              <li><Link to="/products?category=syrups">Syrups</Link></li>
              <li><Link to="/products?category=vitamins">Vitamins</Link></li>
            </ul>
          </div>


          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__list">
              <li>📧 remedicart@gmail.com</li>
              <li>📞 +91 91 72237 145</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Designed and Developed by Saturn X Digital Solutions </p>
          <p>Licensed Online Pharmacy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
