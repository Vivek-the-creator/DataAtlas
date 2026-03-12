import { motion } from 'framer-motion';
import './FilterPanel.css';

const FilterPanel = ({ filters, setFilters }) => {
  const domains = ['Economics', 'Defense', 'Tech', 'Climate', 'Geopolitics'];
  const countries = ['All', 'USA', 'China', 'EU', 'Russia', 'India', 'Israel', 'Taiwan', 'Japan', 'UK', 'France', 'Germany', 'Brazil', 'Australia', 'South Korea', 'Nigeria', 'Egypt', 'Philippines', 'Saudi Arabia', 'Argentina', 'Chile', 'Switzerland'];

  const handleYearChange = (e) => {
    setFilters({ ...filters, year: parseInt(e.target.value) });
  };

  const handleCountryChange = (e) => {
    setFilters({ ...filters, country: e.target.value });
  };

  const toggleDomain = (domain) => {
    const newDomains = filters.domains.includes(domain)
      ? filters.domains.filter(d => d !== domain)
      : [...filters.domains, domain];
    setFilters({ ...filters, domains: newDomains });
  };

  return (
    <motion.div
      className="filter-panel"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="filter-title">Filters</h3>

      {/* Temporal Filter */}
      <div className="filter-section">
        <label className="filter-label">Temporal</label>
        <div className="time-travel-slider">
          <input
            type="range"
            min="2020"
            max="2026"
            value={filters.year}
            onChange={handleYearChange}
            className="slider"
          />
          <div className="year-display">{filters.year}</div>
        </div>
      </div>

      {/* Spatial Filter */}
      <div className="filter-section">
        <label className="filter-label">Spatial</label>
        <select
          value={filters.country}
          onChange={handleCountryChange}
          className="filter-select"
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Domain Filter */}
      <div className="filter-section">
        <label className="filter-label">Domain</label>
        <div className="checkbox-group">
          {domains.map(domain => (
            <label key={domain} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.domains.includes(domain)}
                onChange={() => toggleDomain(domain)}
                className="checkbox"
              />
              <span>{domain}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
