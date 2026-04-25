import './CategoryFilter.css';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'Antiviral & Antibiotic', label: '🦠 Antiviral & Antibiotic' },
  { value: 'Kamagra All Range', label: '💊 Kamagra All Range' },
  { value: 'Modafinil And Armodafinil', label: '💊 Modafinil And Armodafinil' },
  { value: 'Hair Loss Treatment', label: '👤 Hair Loss Treatment' },
  { value: 'Pain Killer', label: '💊 Pain Killer' },
  { value: 'Sleeping Pills', label: '🌙 Sleeping Pills' },
  { value: 'Skin Cream', label: '🧴 Skin Cream' },
  { value: 'Steroid', label: '💉 Steroid' },
  { value: 'Drop Shipping', label: '🚚 Drop Shipping' },
  { value: 'Mens Health', label: '👨 Mens Health' },
  { value: 'Eye and Ear', label: '💧 Eye and Ear' },
  { value: 'Contraceptives', label: '💊 Contraceptives' },
  { value: 'Others', label: '➕ Others' },
];

const CategoryFilter = ({ selected, onChange }) => {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          id={`cat-btn-${cat.value || 'all'}`}
          className={`category-filter__btn${selected === cat.value ? ' active' : ''}`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
