import { motion } from 'framer-motion';
import { useState } from 'react';
import './EventNode.css';

const EventNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColors = {
    Economics: '#8b5cf6',
    Climate: '#10b981',
    Defense: '#f59e0b',
    Tech: '#22d3ee',
  };

  return (
    <motion.div
      className="event-node"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="node-header">
        <span 
          className="node-category"
          style={{ color: categoryColors[node.category] }}
        >
          {node.category}
        </span>
        <span className="node-country">{node.country}</span>
      </div>
      
      <h3 className="node-title">{node.title}</h3>
      
      <div className="node-meta">
        <div className="meta-item">
          <span className="meta-label">Hash:</span>
          <span className="meta-value hash">{node.hash}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Date:</span>
          <span className="meta-value">{node.date}</span>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="node-expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="provenance-section">
            <h4>Merkle-DAG Provenance</h4>
            <div className="dag-tree">
              <div className="dag-node">Root: {node.hash}</div>
              <div className="dag-node child">Parent: 0x{Math.random().toString(16).slice(2, 10)}...</div>
              <div className="dag-node child">Sibling: 0x{Math.random().toString(16).slice(2, 10)}...</div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="ripple-effect"></div>
    </motion.div>
  );
};

export default EventNode;
