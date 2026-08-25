"use client";
import { theme } from "@/theme";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const handleSendOTP = async () => {
    if (!name.trim()) {
      console.log('Name is required')
      return;
    }
    if (!email.trim()) {
      console.log('Email is required')
      return;
    }
    if (!agreedToTerms) {
      console.log('Please agree to terms and Privacy Policy')
      return;
    }
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          purpose: 'register',
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }
      setOtpSent(true);
      console.log("OTP senty successfully")
    } catch (error) {
      console.log('Send OTP error:', error)
    }
    // console.log({
    //   name,
    //   email,
    //   agreedToTerms
    // })
  }
  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      console.log('Verification code is required')
      return;
    }
    if (otp.length !== 6) {
      console.log('Verification code must be 6 digits')
      return;
    }
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message)
        return;
      }
      console.log('Verification Response', data);
      setOtpSent(false);
      router.push("/dashboard");

    } catch (error) {
      console.log('Verify OTP error:', error);
    }
  };
  return (
    <Box
      sx={{
        p: 2,
        justifyContent: "center",
        alignItems: "center",
        width: 500,
        borderWidth: "5px",
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Image src="/intervio_Logo.png" width={100} height={100} alt={""} />
      </Box>
      <Typography sx={{ fontFamily: theme.typography.h6, textAlign: "center" }}>
        Create Your Account
      </Typography>

      <Typography
        sx={{ fontFamily: theme.typography.body1, textAlign: "center" }}
      >
        Start your interview preparation journey
      </Typography>
      <Box>
        <Typography>Full Name</Typography>
        <TextField
          fullWidth
          value={name}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <Typography>Email</Typography>
        <TextField fullWidth value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></TextField>
        {/* <Typography>Password</Typography>
        <TextField fullWidth placeholder="Create a password"></TextField>
        <Typography>Confirm Password</Typography>
        <TextField fullWidth placeholder="Re-enter your password"></TextField> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Checkbox checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}></Checkbox>
        <Typography
          sx={{
            pt: 1,
          }}
        >
          I agree to the Terms and Privacy Policy
        </Typography>
      </Box>
      <Button
        fullWidth
        onClick={handleSendOTP}
        sx={{
          p: 1,
          fontFamily: theme.typography.button,
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Send Verification Code
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 3,
        }}
      >
        <Divider sx={{ flex: 1 }} />
        <Typography
          variant="body2"
          sx={{
            px: 2,
            color: "text.secondary",
          }}
        >
          OR
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>
      <Box
        sx={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            px: 1,
            fontFamily: theme.typography.body2,
          }}
        >
          Already have an account?
        </Typography>
        <Button
          onClick={() => router.push("/login")}
          variant="text"
          sx={{
            fontFamily: theme.typography.body2,
            textTransform: "none",
            minWidth: "auto",
            p: 0,
          }}
        >
          Sign In
        </Button>
      </Box>

      <Dialog
        open={otpSent}
        onClose={() => setOtpSent(false)}
        fullWidth
        maxWidth="xs"
      >
        <Box sx={{ p: 4 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 1,
            }}
          >
            Verify Your Email
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 3,
            }}
          >
            Enter the 6-digit verification code sent to {email}
          </Typography>

          <TextField
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit code"
            slotProps={{
              htmlInput: {
                maxLength: 6,
                inputMode: "numeric",
              },
            }}
          />

          <Button
            fullWidth
            onClick={handleVerifyOTP}
            sx={{
              mt: 2,
              p: 1,
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            Verify Code
          </Button>
        </Box>
      </Dialog>

    </Box>
  );
};
export default RegisterPage;
