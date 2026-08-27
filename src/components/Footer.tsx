'use client'
import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: {
                    xs: 4,
                    md: 6,
                },
            }}
        >
            {/* FINAL CTA */}
            <Box
                sx={{
                    mx: {
                        xs: 2,
                        sm: 3,
                        md: 6,
                    },

                    px: {
                        xs: 3,
                        sm: 5,
                        md: 8,
                    },

                    py: {
                        xs: 6,
                        sm: 7,
                        md: 8,
                    },

                    textAlign: "center",

                    borderRadius: {
                        xs: 4,
                        md: 5,
                    },

                    background:
                        "linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)",

                    boxShadow:
                        "0 24px 60px rgba(79, 70, 229, 0.18)",
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        color: "#FFFFFF",

                        fontWeight: 800,

                        fontSize: {
                            xs: "2rem",
                            sm: "2.5rem",
                            md: "3rem",
                        },

                        lineHeight: 1.15,
                        letterSpacing: "-0.03em",
                    }}
                >
                    Ready to practice your
                    <br />
                    next interview?
                </Typography>

                <Typography
                    sx={{
                        mt: 2,

                        mx: "auto",

                        maxWidth: 600,

                        color: "rgba(255,255,255,0.78)",

                        fontSize: {
                            xs: "1rem",
                            md: "1.1rem",
                        },

                        lineHeight: 1.7,
                    }}
                >
                    Turn your resume into a personalized mock interview,
                    practice your answers, and discover where you can improve.
                </Typography>

                <Button
                    component={Link}
                    href="/resume"
                    size="large"
                    sx={{
                        mt: 4,

                        px: {
                            xs: 4,
                            md: 5,
                        },

                        py: 1.5,

                        bgcolor: "#FFFFFF",
                        color: "#1E3A8A",

                        borderRadius: 2.5,

                        textTransform: "none",

                        fontWeight: 700,

                        "&:hover": {
                            bgcolor: "#F8FAFC",
                        },
                    }}
                >
                    Start Practicing
                </Button>
            </Box>

            {/* FOOTER */}
            <Box
                sx={{
                    mt: {
                        xs: 4,
                        md: 5,
                    },

                    px: {
                        xs: 2,
                        sm: 4,
                        md: 7,
                    },

                    pt: {
                        xs: 5,
                        md: 6,
                    },

                    pb: 3,

                    bgcolor: "#0F172A",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1400,
                        mx: "auto",

                        display: "flex",

                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },

                        justifyContent: "space-between",

                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },

                        gap: 4,
                    }}
                >
                    {/* BRAND */}
                    <Box>
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
                                    gap: 1,
                                }}
                            >
                                <Image
                                    src="/Yourcareer_Footer.png"
                                    alt="YourCareerForge"
                                    width={150}
                                    height={75}
                                />
                            </Box>
                        </Link>

                        <Typography
                            sx={{
                                mt: 1.5,
                                maxWidth: 380,
                                color: "#94A3B8",
                                lineHeight: 1.7,
                            }}
                        >
                            Practice your skills. Improve your answers.
                            Build confidence for your next opportunity.
                        </Typography>
                    </Box>

                    {/* SIMPLE LINKS */}
                    <Box
                        sx={{
                            display: "flex",

                            flexWrap: "wrap",

                            gap: {
                                xs: 2,
                                sm: 3,
                            },
                        }}
                    >
                        <Link
                            href="/login"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#CBD5E1",

                                    "&:hover": {
                                        color: "#FFFFFF",
                                    },
                                }}
                            >
                                Sign In
                            </Typography>
                        </Link>

                        <Link
                            href="/register"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#CBD5E1",

                                    "&:hover": {
                                        color: "#FFFFFF",
                                    },
                                }}
                            >
                                Create Account
                            </Typography>
                        </Link>
                    </Box>
                </Box>

                <Divider
                    sx={{
                        my: 4,
                        borderColor: "rgba(255,255,255,0.1)",
                    }}
                />

                <Box
                    sx={{
                        maxWidth: 1400,
                        mx: "auto",

                        display: "flex",

                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },

                        justifyContent: "space-between",

                        gap: 1.5,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#64748B",
                        }}
                    >
                        © 2026 YourCareerForge. All rights reserved.
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#64748B",
                        }}
                    >
                        Built to help you prepare for what&apos;s next.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}