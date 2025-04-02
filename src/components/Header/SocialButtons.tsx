import { Box, Button, Menu, MenuItem, Typography, Grid } from '@mui/material';
import { socialIconsWithLinks } from '@/config';
import { OutlinedButton } from '@/components/ui';
import React, { useState } from 'react';


interface DropdownData {
  Tools: string[];
  Explore: string[];
  Services: string[];
}

export const SocialButtons = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const dropdownData: DropdownData = {
    Tools: ['Unit converter', 'Account checker', 'Data decoder'],
    Explore: ['Tokens', 'Appchains', 'Social value portal'],
    Services: ['Token approvals', 'Verified signature', 'Contract approve'],
  };


  const dropdownKeys = Object.keys(dropdownData) as (keyof DropdownData)[];

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mr: 1,
      }}
    >
      <OutlinedButton
        key={'more_button'}
        text='More'
        sx={{
          width: '80px'
        }}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            width: '100%',
            backgroundColor: '#000'
          },
        }}
      >
        <Grid container spacing={5} sx={{ padding: 5 }}>
          {dropdownKeys.map((columnTitle) => (
            <Grid item xs={12} sm={4} key={columnTitle}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1} color="inherit">
                {columnTitle}
              </Typography>
              {dropdownData[columnTitle].map((item) => (
                <MenuItem
                  key={item}
                  onClick={handleClose}
                  sx={{
                    color: 'inherit'
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Grid>
          ))}
        </Grid>
      </Menu>
      {socialIconsWithLinks.map(({ icon: Icon, url }) => (
        <OutlinedButton
          key={url}
          icon={<Icon />}
          url={url}
        />
      ))}
    </Box>
  );
};