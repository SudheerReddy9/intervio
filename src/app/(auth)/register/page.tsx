'use client';
import { theme } from "@/theme"
import { Box, Button, Checkbox, Divider, TextField, Typography } from "@mui/material"
import Image from 'next/image';
import { useRouter } from "next/navigation";
const RegisterPage: React.FC = () => {
    const router = useRouter();
    return (
        <Box
            sx={{
                p: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width: 500,
                borderWidth: '5px',
                background: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
            }}
        >
            <Box
                sx={{
                    textAlign: 'center'
                }}
            >
                <Image
                    src='/intervio_Logo.png'
                    width={100}
                    height={100} alt={""}
                />

            </Box>
            <Typography sx={{ fontFamily: theme.typography.h6, textAlign: 'center' }}>
                Create Your Account
            </Typography>

            <Typography sx={{ fontFamily: theme.typography.body1, textAlign: 'center' }} >
                Start your interview preparation journey
            </Typography>
            <Box>
                <Typography>Full Name</Typography>
                <TextField
                    fullWidth
                    placeholder="Full Name"
                >

                </TextField>
                <Typography>Email</Typography>
                <TextField
                    fullWidth
                    placeholder="Email"
                >

                </TextField>
                <Typography>Password</Typography>
                <TextField
                    fullWidth
                    placeholder="Create a password"
                >

                </TextField>
                <Typography>Confirm Password</Typography>
                <TextField
                    fullWidth
                    placeholder="Re-enter your password"
                >

                </TextField>

            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'row'
                }}
            >
                <Checkbox></Checkbox>
                <Typography sx={{
                    pt: 1
                }}>I agree to the Terms and Privacy Policy</Typography>
            </Box>
            <Button
                fullWidth
                sx={{
                    p: 1,
                    fontFamily: theme.typography.button,
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                }}
            >
                Sign In
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
                    textAlign: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Typography variant="body1" sx={{
                    px: 1,
                    fontFamily: theme.typography.body2
                }}>
                    Already have an account?
                </Typography>
                <Button
                    onClick={() => router.push('/register')
                    }
                    variant="text"
                    sx={{
                        fontFamily: theme.typography.body2,
                        textTransform: 'none',
                        minWidth: 'auto',
                        p: 0,
                    }}
                >
                    Sigin
                </Button>
            </Box>
        </Box >
    )
}
export default RegisterPage