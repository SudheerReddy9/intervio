"use client";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSendOTP = async () => {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!agreedToTerms) {
      setError(
        "Please agree to the Terms and Privacy Policy."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          purpose: "register",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
          "Unable to send verification code."
        );
        return;
      }

      setOtp("");
      setOtpError("");
      setOtpSent(true);
    } catch (error) {
      console.error("Send OTP error:", error);

      setError(
        "Something went wrong while sending the verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setOtpError(
        "Please enter your verification code."
      );
      return;
    }

    if (otp.length !== 6) {
      setOtpError(
        "Verification code must be 6 digits."
      );
      return;
    }

    setVerifying(true);
    setOtpError("");

    try {
      const response = await fetch(
        "/api/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setOtpError(
          data.message ||
          "Invalid verification code."
        );
        return;
      }

      setOtpSent(false);

      router.push("/dashboard");
    } catch (error) {
      console.error("Verify OTP error:", error);

      setOtpError(
        "Something went wrong while verifying your code."
      );
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: {
          xs: "calc(100vh - 64px)",
          sm: "calc(100vh - 72px)",
        },

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        px: {
          xs: 2,
          sm: 3,
        },

        py: {
          xs: 5,
          sm: 7,
          md: 8,
        },

        background:
          "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 50%, #F5F3FF 100%)",
      }}
    >
      {/* REGISTER CARD */}

      <Box
        sx={{
          width: "100%",
          maxWidth: 500,

          bgcolor: "#FFFFFF",

          border: "1px solid #E2E8F0",

          borderRadius: {
            xs: 3,
            sm: 4,
          },

          p: {
            xs: 3,
            sm: 4.5,
          },

          boxShadow:
            "0 24px 70px rgba(15, 23, 42, 0.10)",
        }}
      >
        {/* LOGO */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: "relative",

              width: {
                xs: 180,
                sm: 210,
              },

              height: 52,
            }}
          >
            <Image
              src="/Yourcareer_Header.png"
              alt="YourCareerForge"
              fill
              priority
              sizes="210px"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* TITLE */}

        <Typography
          component="h1"
          sx={{
            textAlign: "center",

            fontSize: {
              xs: "1.75rem",
              sm: "2rem",
            },

            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.02em",
          }}
        >
          Create your account
        </Typography>

        <Typography
          sx={{
            mt: 1,
            mb: 4,

            textAlign: "center",
            color: "#64748B",
            lineHeight: 1.6,
          }}
        >
          Start practicing personalized interviews and
          improving your skills with AI feedback.
        </Typography>

        {/* ERROR */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* NAME */}

        <Typography
          component="label"
          htmlFor="full-name"
          sx={{
            display: "block",
            mb: 1,
            fontWeight: 600,
            color: "#334155",
          }}
        >
          Full name
        </Typography>

        <TextField
          id="full-name"
          fullWidth
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          placeholder="Enter your full name"
          autoComplete="name"
          sx={{
            mb: 2.5,

            "& .MuiOutlinedInput-root": {
              borderRadius: 2.5,
            },
          }}
        />

        {/* EMAIL */}

        <Typography
          component="label"
          htmlFor="register-email"
          sx={{
            display: "block",
            mb: 1,
            fontWeight: 600,
            color: "#334155",
          }}
        >
          Email address
        </Typography>

        <TextField
          id="register-email"
          fullWidth
          value={email}
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2.5,
            },
          }}
        />

        {/* TERMS */}

        <FormControlLabel
          sx={{
            mt: 2,
            mb: 1,

            alignItems: "flex-start",

            "& .MuiFormControlLabel-label": {
              pt: "8px",
            },
          }}
          control={
            <Checkbox
              checked={agreedToTerms}
              onChange={(event) => {
                setAgreedToTerms(
                  event.target.checked
                );

                setError("");
              }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                lineHeight: 1.6,
              }}
            >
              I agree to the Terms of Service and
              Privacy Policy.
            </Typography>
          }
        />

        {/* CREATE ACCOUNT */}

        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          onClick={handleSendOTP}
          sx={{
            mt: 1.5,

            py: 1.4,

            borderRadius: 2.5,

            textTransform: "none",
            fontWeight: 700,

            boxShadow:
              "0 8px 20px rgba(37, 99, 235, 0.18)",
          }}
        >
          {loading ? (
            <CircularProgress
              size={22}
              sx={{
                color: "#FFFFFF",
              }}
            />
          ) : (
            "Create Account"
          )}
        </Button>

        {/* LOGIN */}

        <Box
          sx={{
            mt: 3,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            flexWrap: "wrap",
            gap: 0.75,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
            }}
          >
            Already have an account?
          </Typography>

          <Button
            component={Link}
            href="/login"
            variant="text"
            sx={{
              minWidth: "auto",
              p: 0,

              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>

      {/* OTP DIALOG */}

      <Dialog
        open={otpSent}
        onClose={() => {
          if (!verifying) {
            setOtpSent(false);
          }
        }}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              m: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            p: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,

              mx: "auto",
              mb: 2,

              borderRadius: "50%",

              bgcolor: "#EEF2FF",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "1.5rem",
            }}
          >
            ✉️
          </Box>

          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 800,
              color: "#0F172A",
            }}
          >
            Verify your email
          </Typography>

          <Typography
            sx={{
              textAlign: "center",

              color: "#64748B",

              mt: 1,
              mb: 3,

              lineHeight: 1.6,
            }}
          >
            We sent a 6-digit verification code to{" "}
            <Box
              component="span"
              sx={{
                color: "#334155",
                fontWeight: 600,
              }}
            >
              {email}
            </Box>
          </Typography>

          {otpError && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 2,
              }}
            >
              {otpError}
            </Alert>
          )}

          <TextField
            fullWidth
            autoFocus
            value={otp}
            onChange={(event) => {
              const value =
                event.target.value.replace(/\D/g, "");

              setOtp(value);
              setOtpError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleVerifyOTP();
              }
            }}
            placeholder="000000"
            slotProps={{
              htmlInput: {
                maxLength: 6,
                inputMode: "numeric",

                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  letterSpacing: "0.4rem",
                  fontWeight: 700,
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={
              verifying || otp.length !== 6
            }
            onClick={handleVerifyOTP}
            sx={{
              mt: 2.5,
              py: 1.4,

              borderRadius: 2.5,

              textTransform: "none",
              fontWeight: 700,
            }}
          >
            {verifying ? (
              <CircularProgress
                size={22}
                sx={{
                  color: "#FFFFFF",
                }}
              />
            ) : (
              "Verify & Create Account"
            )}
          </Button>

          <Button
            fullWidth
            disabled={verifying}
            onClick={() => {
              setOtpSent(false);
              setOtp("");
              setOtpError("");
            }}
            sx={{
              mt: 1,

              textTransform: "none",
              color: "#64748B",
            }}
          >
            Use a different email
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default RegisterPage;