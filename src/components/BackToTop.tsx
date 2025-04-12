'use client';

import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Zoom } from '@mui/material';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1300,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          },
          boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default BackToTopButton;