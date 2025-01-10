// src/components/AccordionComponent.jsx
import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import './AccordionComponent.css'; // Ensure this file exists with necessary styles
import PropTypes from 'prop-types'; // Import PropTypes for type checking

const AccordionComponent = ({ items }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <ul className="accordion">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => handleOpenModal(item)}
            className="accordion-item"
          >
            <img src={item.img} alt={item.alt} loading="lazy" />
            {/* Removed the content div since `name` and `role` are no longer needed */}
          </li>
        ))}
      </ul>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="accordion-item-modal-title"
        aria-describedby="accordion-item-modal-description"
      >
        <Box className="accordion-modal-box">
          {selectedItem && (
            <>
              <img
                src={selectedItem.img}
                alt={selectedItem.alt}
                className="accordion-full-image"
                loading="lazy"
              />
              {/* Optional: Add additional details or descriptions here if needed */}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModal}
                style={{ marginTop: '16px' }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

// Updated PropTypes for type checking
AccordionComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      // Removed `name` and `role` since they're no longer needed
    })
  ).isRequired,
};

export default AccordionComponent;
