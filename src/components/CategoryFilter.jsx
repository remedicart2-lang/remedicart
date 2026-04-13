import './CategoryFilter.css';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'tablets', label: '💊 Tablets' },
  { value: 'syrups', label: '🍶 Syrups' },
  { value: 'capsules', label: '💉 Capsules' },
  { value: 'vitamins', label: '🌿 Vitamins' },
  { value: 'skincare', label: '✨ Skincare' },
  { value: 'devices', label: '🩺 Devices' },
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
