import { theme } from "@/theme"
import { Box, Checkbox, TextField, Typography } from "@mui/material"
import Image from 'next/image';
const RegisterPage: React.FC = () => {
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
        </Box>
    )
}
export default RegisterPage