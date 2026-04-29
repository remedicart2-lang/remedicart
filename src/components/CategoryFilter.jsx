import './CategoryFilter.css';

const CATEGORIES = [
  { value: '', label: 'All', icon: '🌐' },
  { value: 'best-seller', label: 'Best Seller', icon: '⭐' },
  { value: 'antiviral-antibiotic', label: 'Antiviral & Antibiotic', icon: '🦠' },
  { value: 'kamagra', label: 'Kamagra', icon: '💊' },
  { value: 'sildenafil', label: 'Sildenafil', icon: '💊' },
  { value: 'tadalafil', label: 'Tadalafil', icon: '💊' },
  { value: 'vardenafil', label: 'Vardenafil', icon: '💊' },
  { value: 'avanafil', label: 'Avanafil', icon: '💊' },
  { value: 'modafinil-armodafinil', label: 'Modafinil & Armodafinil', icon: '🧠' },
  { value: 'hair-loss', label: 'Hair Loss', icon: '👤' },
  { value: 'pain-killer', label: 'Pain Killer', icon: '💊' },
  { value: 'sleeping-pills', label: 'Sleeping Pills', icon: '🌙' },
  { value: 'skin-cream', label: 'Skin Cream', icon: '🧴' },
  { value: 'weight-loss', label: 'Weight Loss', icon: '⚖️' },
  { value: 'eye-ear-drops', label: 'Eye & Ear Drops', icon: '💧' },
  { value: 'steroid', label: 'Steroid', icon: '💉' },
  { value: 'drop-shipping', label: 'Drop Shipping', icon: '🚚' },
  { value: 'contraceptives', label: 'Contraceptives', icon: '🛡️' },
  { value: 'others', label: 'Others', icon: '➕' },
];

const CategoryFilter = ({ selected, onChange }) => {
  return (
    <div className="category-grid" role="group" aria-label="Filter by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          id={`cat-btn-${cat.value || 'all'}`}
          className={`category-card${selected === cat.value ? ' active' : ''}`}
          onClick={() => onChange(cat.value)}
        >
          <span className="category-card__icon">{cat.icon}</span>
          <span className="category-card__label">{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
