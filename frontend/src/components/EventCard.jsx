import { motion } from 'framer-motion';
import './EventCard.css';

const EventCard = ({ event, index }) => {
  const positions = [
    { top: '15%', left: '8%' },
    { top: '65%', left: '5%' },
    { top: '25%', right: '6%' },
    { top: '75%', right: '8%' },
    { top: '40%', left: '3%' },
  ];

  const categoryColors = {
    Geopolitics: '#686464ff',
    Climate: '#686464ff',
    Defense: '#686464ff',
    Economics: '#686464ff',
    Technology: '#686464ff',
  };

  return (
    <motion.div
      className="event-card"
      style={{
        ...positions[index % positions.length],
        borderColor: categoryColors[event.category],
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [20, 0, 0, -20]
      }}
      transition={{
        duration: 8,
        delay: index * 0.5,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div className="card-header">
        <span 
          className="category-badge"
          style={{ backgroundColor: categoryColors[event.category] }}
        >
          {event.category}
        </span>
      </div>
      <div className="card-body">
        <div className="hash-line">
          <span className="label">Hash:</span>
          <span className="hash">{event.hash}</span>
        </div>
        <div className="timestamp-line">
          <span className="label">Timestamp:</span>
          <span className="timestamp">{event.timestamp}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
