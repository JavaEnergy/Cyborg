// src/components/AccordionComponent.jsx
import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import './AccordionComponent.css'; // Ensure this file exists with necessary styles

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
          <li key={item.id} onClick={() => handleOpenModal(item)}>
            <img src={item.img} alt={item.name} />
            <div className="content">
              <span>
                <h2>{item.name}</h2>
                <p>{item.role}</p>
              </span>
            </div>
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
                alt={selectedItem.name}
                className="accordion-full-image"
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

export default AccordionComponent;
