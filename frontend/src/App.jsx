import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Discovery from './components/Discovery';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('hero');
  const [showHeroContent, setShowHeroContent] = useState(false);

  const handleGetStarted = () => {
    setShowHeroContent(true);
    setCurrentPage('discovery');
  };

  const handleBack = () => {
    setCurrentPage('hero');
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentPage === 'hero' ? (
          <Hero 
            key="hero" 
            onGetStarted={handleGetStarted}
            showContent={showHeroContent}
            setShowContent={setShowHeroContent}
          />
        ) : (
          <Discovery key="discovery" onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
