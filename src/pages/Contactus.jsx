import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import './Contactus.css';

const Contactus = () => {
  const [phone, setPhone] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Clear old status
    setStatus({
      type: '',
      message: ''
    });

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbxv0GHNz5pepN3vR0Kn3mFvCfYAsA3hCRr1JhJIqVXyXmcY4d1g-A6aHj_NjX7WbIvkvQ/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            ...formData,
            phone
          })
        }
      );

      // Success message
      setStatus({
        type: 'success',
        message: 'Inquiry sent successfully!'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        location: '',
        message: ''
      });

      setPhone('');

    } catch (error) {
      console.error(error);

      // Error message
      setStatus({
        type: 'error',
        message: 'Failed to send inquiry. Please try again.'
      });
    }

    setLoading(false);
  };

  return (
    <div className="contact-page">

      {/* Header Section */}
      <header className="contact-header">
        <div className="contact-header__badge">
          <span>✦</span> CONNECT WITH US <span>✦</span>
        </div>

        <h1 className="contact-header__title">
          Let's Connect
        </h1>

        <p className="contact-header__subtitle">
          We're here to help. Reach out to the RemediCart team for any medical inquiries, support, or partnership opportunities.
        </p>
      </header>

      {/* Main Content */}
      <div className="contact-container">

        {/* Contact Info */}
        <aside className="contact-info">

          <h2 className="contact-info__title">
            Reach Us
          </h2>

          {/* Phone */}
          <div className="info-item">
            <div className="info-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>

            <div className="info-item__content">
              <span className="info-item__label">
                Phone
              </span>

              <span className="info-item__value">
                +91 80 07190 701
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="info-item">
            <div className="info-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>

            <div className="info-item__content">
              <span className="info-item__label">
                Email
              </span>

              <span className="info-item__value">
                info@remedicart.com
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="info-item">
            <div className="info-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>

            <div className="info-item__content">
              <span className="info-item__label">
                Location
              </span>

              <span className="info-item__value">
                Nagpur, Maharashtra, India
              </span>
            </div>
          </div>

        </aside>

        {/* Form */}
        <section className="contact-form-container">

          <h2 className="contact-form__title">
            Send Us a Message
          </h2>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-column">

              {/* Name */}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="form-group phone-group">
                <PhoneInput
                  defaultCountry="in"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  className="phone-input-container"
                  inputClassName="phone-input-field"
                  countrySelectorStyleProps={{
                    buttonClassName: 'phone-input-button',
                    dropdownClassName: 'phone-input-dropdown'
                  }}
                />
              </div>

              {/* Location */}
              <div className="form-group">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* Message */}
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Write your message here..."
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Inquiry'}
            </button>

            {/* Status Message */}
            {status.message && (
              <p className={`form-status ${status.type}`}>
                {status.message}
              </p>
            )}

          </form>
        </section>
      </div>
    </div>
  );
};

export default Contactus;