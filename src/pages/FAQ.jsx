import React, { useState } from 'react';
import './FAQ.css';

const FAQ_DATA = [
  {
    id: 1,
    question: "What products does RemediCart offer?",
    answer: "RemediCart offers a comprehensive range of genuine medicines, healthcare essentials, wellness products, and over-the-counter medical supplies from verified global suppliers."
  },
  {
    id: 2,
    question: "How do I place an order with RemediCart?",
    answer: "Placing an order is simple: browse our products, add items to your cart, and proceed to checkout. You can also use our 'Inquire Now' feature for bulk or specific medical requirements."
  },
  {
    id: 3,
    question: "Is my personal information safe with RemediCart?",
    answer: "Yes, we use industry-standard encryption and secure database management (Supabase) to ensure your personal and medical information is always protected."
  },
  {
    id: 4,
    question: "How do I contact RemediCart for further assistance?",
    answer: "You can reach us through our Contact Us page, email us at remedicart@gmail.com, or call us at +91 91 72237 145 for immediate support."
  },
  {
    id: 5,
    question: "What is the delivery time for an order?",
    answer: "Domestic orders typically arrive within 2-5 business days. International shipment times vary depending on the destination but generally take 7-14 business days."
  },
  {
    id: 6,
    question: "Do you ship internationally?",
    answer: "Yes, RemediCart provides international shipment services to ensure healthcare accessibility for our customers worldwide."
  },
  {
    id: 7,
    question: "How to track my order?",
    answer: "Once your order is shipped, you will receive a tracking ID via email which you can use on our website to monitor your shipment's progress."
  },
  {
    id: 8,
    question: "What shipping ways do you offer?",
    answer: "We offer standard shipping, express delivery for urgent needs, and specialized temperature-controlled logistics for sensitive medical products."
  },
  {
    id: 9,
    question: "What is the return policy at RemediCart?",
    answer: "We offer a 30-day warranty policy. If you receive a damaged or incorrect product, you can initiate a return or exchange within 30 days of delivery."
  },
  {
    id: 10,
    question: "May I cancel the order or change the order?",
    answer: "Orders can be cancelled or modified as long as they haven't been dispatched. Please contact our support team immediately if you need to make changes."
  },
  {
    id: 11,
    question: "Do you offer any freebies or deals on products?",
    answer: "We frequently offer seasonal discounts and extra deals on bulk purchases. Keep an eye on our promotional banners and newsletter for the latest offers."
  },
  {
    id: 12,
    question: "Are your products genuine and secure to use?",
    answer: "Absolutely. Every product on RemediCart is sourced from verified manufacturers and undergoes strict quality checks to ensure safety and authenticity."
  },
  {
    id: 13,
    question: "What forms of payment do you accept?",
    answer: "We accept all major credit/debit cards, net banking, and secure digital payment wallets. Your payment security is our top priority."
  },
  {
    id: 14,
    question: "How do I know if a product is right for me?",
    answer: "Each product page includes detailed descriptions and specifications. However, we always recommend consulting with a healthcare professional before starting new medications."
  },
  {
    id: 15,
    question: "Are there any side effects associated with your products?",
    answer: "Side effects vary per medication. Please read the product insert carefully and consult your doctor to understand potential responses specific to your health profile."
  }
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-page">
      {/* Header Section */}
      <header className="faq-header">
        <div className="container">
          <span className="faq-header__label">Customer Support</span>
          <h1 className="faq-header__title">Frequently Asked Questions</h1>
          <p className="faq-header__subtext">
            Find quick answers about our services, delivery, and products. Can't find what you're looking for? Reach out to us.
          </p>
        </div>
      </header>

      {/* Accordion Container */}
      <main className="faq-container">
        {FAQ_DATA.map((item) => (
          <div 
            key={item.id} 
            className={`faq-item ${activeId === item.id ? 'active' : ''}`}
          >
            <button 
              className="faq-question" 
              onClick={() => toggleAccordion(item.id)}
            >
              {item.question}
              <svg className="faq-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default FAQ;
