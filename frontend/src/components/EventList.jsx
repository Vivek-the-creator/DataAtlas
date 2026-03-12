import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './EventList.css';

const EventList = ({ events }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="event-list">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          className="event-list-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <div className="event-main" onClick={() => toggleExpand(event.id)}>
            <div className="event-left">
              <div className="event-header-row">
                <span className="event-category">
                  {event.category}
                </span>
                <span className="event-country">{event.country}</span>
                <span className="event-impact">
                  {event.impact} Impact
                </span>
              </div>
              <h3 className="event-title">{event.title}</h3>
              <div className="event-meta-row">
                <span className="event-hash">{event.hash}</span>
                <span className="event-date">{event.date}</span>
              </div>
            </div>
            <div className="event-expand-icon">
              {expandedId === event.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {expandedId === event.id && (
            <motion.div
              className="event-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="event-description">{event.description}</p>
              <div className="event-tags">
                {event.tags.map((tag, i) => (
                  <span key={i} className="event-tag">#{tag}</span>
                ))}
              </div>
              <div className="event-provenance">
                <h4>Merkle-DAG Provenance</h4>
                <div className="dag-tree">
                  <div className="dag-node">Root: {event.hash}</div>
                  <div className="dag-node child">Parent: 0x{Math.random().toString(16).slice(2, 10)}...</div>
                  <div className="dag-node child">Sibling: 0x{Math.random().toString(16).slice(2, 10)}...</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default EventList;
