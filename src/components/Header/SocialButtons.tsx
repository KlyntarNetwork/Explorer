import { Box, Menu, MenuItem, Typography, Grid } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import DrawIcon from "@mui/icons-material/Draw";
import { socialIconsWithLinks } from "@/config";
import { OutlinedButton } from "@/components/ui";
import React, { useState } from "react";
import { Link, Search, Code } from "@mui/icons-material";

interface DropdownData {
  Tools: { name: string; icon: React.ComponentType }[];
  Explore: { name: string; icon: React.ComponentType }[];
  Services: { name: string; icon: React.ComponentType }[];
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
    Tools: [
      { name: "Unit converter", icon: ChangeCircleIcon },
      { name: "Account checker", icon: Search },
      { name: "Data decoder", icon: Code },
    ],
    Explore: [
      { name: "Tokens", icon: AssuredWorkloadIcon },
      { name: "Appchains", icon: Link },
      { name: "Social value portal", icon: AutoAwesomeIcon },
    ],
    Services: [
      { name: "Token approvals", icon: VerifiedUserIcon },
      { name: "Verify signature", icon: DrawIcon },
      { name: "Approve contract", icon: SpellcheckIcon },
    ],
  };

  const dropdownKeys = Object.keys(dropdownData) as (keyof DropdownData)[];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mr: 1,
      }}
    >
      <OutlinedButton
        key={"more_button"}
        text="More"
        sx={{
          width: "84px",
        }}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            width: "100%",
            backgroundColor: "#000",
          },
        }}
      >
        <Grid container spacing={5} sx={{ padding: 5 }}>
          {dropdownKeys.map((columnTitle) => (
            <Grid item xs={12} sm={6} md={4} key={columnTitle}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={1}
                color="inherit"
              >
                {columnTitle}
              </Typography>
              {dropdownData[columnTitle].map(({ name, icon: Icon }) => (
                <MenuItem
                  key={name}
                  onClick={handleClose}
                  sx={{
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Icon />
                    <Typography sx={{ ml: 1 }}>{name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Grid>
          ))}
        </Grid>
      </Menu>
      {socialIconsWithLinks.map(({ icon: Icon, url }) => (
        <OutlinedButton key={url} icon={<Icon />} url={url} />
      ))}
    </Box>
  );
};
