'use client';
import { theme } from "@/theme";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 64,
            sm: 72,
          },
          px: {
            xs: 2,
            sm: 3,
            md: 6,
            lg: 8,
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 0.75,
                sm: 1,
              },
            }}
          >
            <Image
              src="/intervio_Logo.png"
              alt="YourCareerForge logo"
              width={44}
              height={44}
              priority
            />

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                  md: "1.4rem",
                },
                whiteSpace: "nowrap",
              }}
            >
              YourCareerForge
            </Typography>
          </Box>
        </Link>

        {/* Sign In */}
        <Button
          component={Link}
          href="/login"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",

            px: {
              xs: 1.5,
              sm: 2.5,
            },

            py: {
              xs: 0.75,
              sm: 1,
            },

            fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
            },
          }}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;