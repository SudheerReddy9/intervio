"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
                return;
            }

            router.push("/login");
            router.refresh();
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <Button
            variant="outlined"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;