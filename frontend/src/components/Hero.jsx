import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import logo from '../assets/logo/logo.png';
import './Hero.css';

const Hero = ({ onGetStarted, showContent, setShowContent }) => {
  const globeEl = useRef();
  const [rootHash, setRootHash] = useState('');

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2 });
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
    }

    // Generate dynamic root hash
    const generateHash = () => {
      const hash = '0x' + Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setRootHash(hash);
    };
    generateHash();
    const interval = setInterval(generateHash, 5000);
    return () => clearInterval(interval);
  }, []);

  const eventData = [
    { hash: '0x7f2a9c...', timestamp: '2026-03-12 14:23:11 UTC', category: 'Geopolitics' },
    { hash: '0x3d8b1e...', timestamp: '2026-03-12 14:18:45 UTC', category: 'Climate' },
    { hash: '0x9c4f7a...', timestamp: '2026-03-12 14:15:32 UTC', category: 'Defense' },
    { hash: '0x1e6d2b...', timestamp: '2026-03-12 14:12:09 UTC', category: 'Economics' },
    { hash: '0x5a8c3f...', timestamp: '2026-03-12 14:08:54 UTC', category: 'Technology' },
  ];

  return (
    <motion.div
      className="hero-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo Button */}
      <motion.button
        className="logo-button"
        onClick={() => setShowContent(!showContent)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={logo} alt="Tech Knights" className="logo-image" />
      </motion.button>

      {/* Globe Background */}
      <div className="globe-wrapper">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="rgba(34, 211, 238, 0.2)"
          atmosphereAltitude={0.10}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>

      {/* Starfield */}
      <div className="starfield"></div>

      {showContent && (
        <>
          {/* Hero Content */}
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              The Consciousness Layer
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Cryptographically verifiable digital twin of global events
            </motion.p>

            {/* CTA Button */}
            <motion.button
              className="cta-button"
              onClick={onGetStarted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Floating Event Cards */}
          <div className="event-cards-container">
            {eventData.map((event, index) => (
              <EventCard key={event.hash} event={event} index={index} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Hero;
