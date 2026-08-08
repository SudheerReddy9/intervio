import { theme } from "@/theme";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Header: React.FC = () => {
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];
  return (
    <AppBar
      elevation={0}
      sx={{
        position: "sticky",
        bgcolor: "background.paper",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: {
            xs: 2,
            md: 6,
            lg: 8,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            px: "12px",
            pt: "12px",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Image
                src="/intervio_Logo.png"
                alt="Intervio Logo"
                width={50}
                height={50}
              />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Intervio
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    color: "text.secondary",
                    px: 2,
                    py: 1.5,
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </Box>
        <Button
          href="/login"
          sx={{
            p: 1,
            whiteSpace: "nowrap",
            minWidth: 100,
            fontFamily: theme.typography.button,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,

          }}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
