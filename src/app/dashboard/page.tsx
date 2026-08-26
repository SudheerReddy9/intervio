
import { Box, Button, Typography } from "@mui/material";
import { theme } from "@/theme";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";
import db from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import LogoutButton from "@/components/LogoutButton";
interface SessionRow extends RowDataPacket {
    user_id: number;
    expires_at: Date;
}
const DashboardPage = async () => {
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
        redirect("/login");
    }
    const tokenHash = createHash("sha256")
        .update(sessionToken)
        .digest("hex");

    const [sessions] = await db.execute<SessionRow[]>(
        `SELECT user_id, expires_at
     FROM sessions
     WHERE token_hash = ?
     LIMIT 1`,
        [tokenHash]
    );

    if (sessions.length === 0) {
        redirect("/login");
    }

    const session = sessions[0];

    if (new Date() > new Date(session.expires_at)) {
        redirect("/login");
    }
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: theme.palette.background.default,
                p: 4,
            }}
        >
            <Typography variant="h4">
                Dashboard
            </Typography>

            <Typography sx={{ mt: 1 }}>
                Welcome! Your account has been created successfully.
            </Typography>

            <Button
                variant="contained"
                sx={{ mt: 3 }}
                href="/resume"
            >
                Start Interview
            </Button>
            <Box sx={{ mt: 2 }}>
                <LogoutButton />
            </Box>
        </Box>
    );
};

export default DashboardPage;