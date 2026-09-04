"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }

        const data = await response.json();

        console.log("HEADER AUTH:", data);

        setIsAuthenticated(data.authenticated === true);
      } catch (error) {
        console.error("Header authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();

    window.addEventListener("auth-changed", checkAuthentication);

    return () => {
      window.removeEventListener("auth-changed", checkAuthentication);
    };
  }, []);
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E2E8F0",
        color: "#0F172A",
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 64,
            sm: 72,
          },

          maxWidth: 1440,
          width: "100%",
          mx: "auto",

          px: {
            xs: 2,
            sm: 3,
            md: 5,
            lg: 7,
          },

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              position: "relative",

              width: {
                xs: 155,
                sm: 190,
                md: 215,
              },

              height: {
                xs: 38,
                sm: 44,
                md: 48,
              },
            }}
          >
            <Image
              src="/Yourcareer_Header.png"
              alt="YourCareerForge"
              fill
              priority
              sizes="(max-width: 600px) 155px, (max-width: 900px) 190px, 215px"
              style={{
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </Box>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },

            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            component="a"
            href="#how-it-works"
            sx={{
              color: "#475569",
              textTransform: "none",
              fontWeight: 600,

              px: 2,

              "&:hover": {
                color: "#2563EB",
                bgcolor: "#EFF6FF",
              },
            }}
          >
            How It Works
          </Button>

          {isAuthenticated ? (
            <Button
              component={Link}
              href="/dashboard"
              variant="contained"
              sx={{
                ml: 1,
                px: 2.75,
                py: 1,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.18)",
              }}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                href="/login"
                sx={{
                  color: "#334155",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                }}
              >
                Sign In
              </Button>

              <Button
                component={Link}
                href="/register"
                variant="contained"
                sx={{
                  ml: 1,
                  px: 2.75,
                  py: 1,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.18)",

                  "&:hover": {
                    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.24)",
                  },
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </Box>

        {/* MOBILE */}
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {isAuthenticated ? (
            <Button
              component={Link}
              href="/dashboard"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
                textTransform: "none",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              component={Link}
              href="/login"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
                textTransform: "none",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Sign In
            </Button>
          )}

          <IconButton
            aria-label="Open navigation"
            onClick={() => setMobileOpen((previous) => !previous)}
            sx={{
              color: "#0F172A",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            flexDirection: "column",
            gap: 1,

            px: 2,
            pb: 2,

            borderTop: "1px solid #E2E8F0",
            bgcolor: "#FFFFFF",
          }}
        >
          <Button
            component="a"
            href="#how-it-works"
            onClick={() => setMobileOpen(false)}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              color: "#334155",
              fontWeight: 600,
              py: 1.25,
            }}
          >
            How It Works
          </Button>

          <Button
            component={Link}
            href="/login"
            onClick={() => setMobileOpen(false)}
            sx={{
              display: {
                sm: "none",
              },

              justifyContent: "flex-start",
              textTransform: "none",
              color: "#334155",
              fontWeight: 600,
              py: 1.25,
            }}
          >
            Sign In
          </Button>

          <Button
            component={Link}
            href="/register"
            variant="contained"
            onClick={() => setMobileOpen(false)}
            sx={{
              mt: 0.5,
              py: 1.15,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Get Started
          </Button>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;