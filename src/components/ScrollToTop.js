// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top when the pathname changes, not the hash
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
