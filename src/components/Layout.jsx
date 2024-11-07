// Layout.js
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header'; // Import your Header component

const Layout = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const location = useLocation();

  const adjustContentPadding = () => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  };

  useEffect(() => {
    adjustContentPadding(); // Initial adjustment
    window.addEventListener('resize', adjustContentPadding); // Adjust on window resize

    return () => window.removeEventListener('resize', adjustContentPadding); // Cleanup
  }, []);

  useEffect(() => {
    adjustContentPadding(); // Adjust on route change
  }, [location.pathname]);

  return (
    <>
      <Header ref={headerRef} /> {/* Pass the ref to Header */}
      <main className="main-content" style={{ paddingTop: `${headerHeight}px` }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
