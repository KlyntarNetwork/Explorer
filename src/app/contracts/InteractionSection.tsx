"use client";

import { Box, Button } from "@mui/material";

export const InteractionSection = ({
  address,
}: {
  address: string;
}) => {
  const handleRedirect = () => {
    const url = `https://portal.klyntar.org/contract-interaction?contract=${encodeURIComponent(
      address
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRedirect}
        sx={{
          fontSize: "18px",
          px: 4,
          py: 1.5,
          borderRadius: 3,
        }}
      >
        Interact via portal
      </Button>
    </Box>
  );
};
