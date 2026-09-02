import db from "@/lib/db";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import type { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
    id: number;
    name: string;
    email: string;
}

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
        return null;
    }

    const tokenHash = createHash("sha256")
        .update(sessionToken)
        .digest("hex");

    const [users] = await db.execute<UserRow[]>(
        `
      SELECT
        u.id,
        u.name,
        u.email
      FROM sessions s
      INNER JOIN users u
        ON u.id = s.user_id
      WHERE s.token_hash = ?
        AND s.expires_at > NOW()
      LIMIT 1
    `,
        [tokenHash]
    );

    if (users.length === 0) {
        return null;
    }

    return {
        id: users[0].id,
        name: users[0].name,
        email: users[0].email,
    };
}