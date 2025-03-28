"use client";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import { majorMonoDisplay } from "@/styles/theme";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "75vh",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mb: 2,
          fontFamily: majorMonoDisplay.style.fontFamily,
          fontSize: "36px",
        }}
      >
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Page not found
      </Typography>
      <Button variant="contained" onClick={handleGoBack}>
        Go back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
