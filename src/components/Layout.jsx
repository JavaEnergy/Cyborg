// Layout.js
import React, { useEffect } from 'react';
import Header from './Header/Header'; // Import your Header component
// import './Layout.css'; 


const Layout = ({ children }) => {
  useEffect(() => {
    const adjustContentPadding = () => {
      const header = document.querySelector('.header');
      const mainContent = document.querySelector('.main-content');
      const headerHeight = header.offsetHeight;

      // Apply dynamic padding to the main content
      if (mainContent) mainContent.style.paddingTop = `${headerHeight}px`;
    };

    adjustContentPadding(); // Initial adjustment
    window.addEventListener('resize', adjustContentPadding); // Adjust on window resize

    return () => window.removeEventListener('resize', adjustContentPadding); // Cleanup
  }, []);

  return (
    <>
      <Header />  {/* Sticky header */}
      <main className="main-content">{children}</main>  {/* Page content */}
    </>
  );
};

export default Layout;
