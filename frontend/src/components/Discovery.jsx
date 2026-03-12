import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import FilterPanel from './FilterPanel';
import EventList from './EventList';
import eventsData from '../data/events.json';
import logo from '../assets/logo/logo.png';
import './Discovery.css';

const Discovery = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    year: 2026,
    country: 'All',
    domains: ['Economics', 'Defense', 'Tech', 'Climate', 'Geopolitics'],
  });

  // Filter events based on search and filters
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = new Date(event.date).getFullYear() <= filters.year;
    const matchesCountry = filters.country === 'All' || event.country === filters.country;
    const matchesDomain = filters.domains.includes(event.category);
    
    return matchesSearch && matchesYear && matchesCountry && matchesDomain;
  });

  return (
    <motion.div
      className="discovery-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      

      {/* Search Bar */}
      <div className="search-container">
        <button className="search-back-button" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <img src={logo} alt="Tech Knights" className="search-logo" />
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="discovery-content">
        {/* Filter Panel */}
        <FilterPanel filters={filters} setFilters={setFilters} />

        {/* Results List */}
        <div className="results-area">
          <div className="results-header">
            <h2>Event Nodes</h2>
          </div>
          <EventList events={filteredEvents} />
        </div>
      </div>
    </motion.div>
  );
};

export default Discovery;
