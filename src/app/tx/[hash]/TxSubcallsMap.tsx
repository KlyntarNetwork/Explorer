'use client';

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Collapse from '@mui/material/Collapse';
import WorkIcon from '@mui/icons-material/Work';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { ListItemIcon } from '@mui/material';

export default function TxSubcallsMap() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ width: '100%' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImportExportIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Native program call" secondary="Average coins transfer" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SettingsSuggestIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Contract called" secondary="Some logic executed" />
        <IconButton edge="end" onClick={handleClick}>
          <KeyboardDoubleArrowDownIcon />
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <ListItem>
        <ListItemText inset primary="Details 1 (coming soon)" />
    </ListItem>
    <ListItem>
      <ListItemText inset primary="Details 2 (coming soon)" />
    </ListItem>
  </List>
</Collapse>
    </List>
  );
}
