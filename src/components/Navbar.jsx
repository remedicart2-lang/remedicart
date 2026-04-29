import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services/authService';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__left">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="topbar__text">Discount up to 35% for first purchase only this month.</span>
          </div>
          <div className="topbar__right">
            <span className="topbar__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              remedicart@gmail.com
            </span>
            <span className="topbar__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 91 72237 145
            </span>
          </div>
        </div>
      </div>

      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Remedicart Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Shop</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About us</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact us</NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Blog</NavLink>
          <NavLink to="/faq" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>FAQ</NavLink>
        </nav>


        {/* Hamburger */}
        <button className={`navbar__hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} id="navbar-hamburger-btn" aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu${menuOpen ? ' open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)} className="mobile-nav-link">Home</NavLink>
        <NavLink to="/products" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Shop</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)} className="mobile-nav-link">About us</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Contact us</NavLink>
        <NavLink to="/blog" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Blog</NavLink>
        <NavLink to="/faq" onClick={() => setMenuOpen(false)} className="mobile-nav-link">FAQ</NavLink>
        {isAdmin && <NavLink to="/admin" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Admin Panel</NavLink>}
      </div>
    </header>
    </>
  );
};

export default Navbar;
