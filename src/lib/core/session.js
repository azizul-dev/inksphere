import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.user || null;
}

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.session?.token || null;
}

/**
 * Fetches the user's role from the Express backend — the single source
 * of truth for roles (better-auth's admin() plugin blocks client-set roles,
 * so session.user.role is always null for newly registered users).
 */
export const getRoleFromDB = async (email) => {
    try {
        const res = await fetch(`${BASE_URL}/api/users/${email}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const dbUser = await res.json();
        return dbUser?.role || null;
    } catch {
        return null;
    }
};

/** Maps a role string to its dashboard path */
export const getDashboardPath = (role) => {
    const map = {
        admin: "/dashboard/admin",
        writer: "/dashboard/writer",
        reader: "/dashboard/reader",
    };
    return map[role] || "/";
};

export const requireRole = async (role) => {
    const user = await getUserSession();
    if (!user) {
        redirect('/auth/signin');
    }

    // Fetch actual role from Express backend — source of truth
    const actualRole = await getRoleFromDB(user.email);

    if (actualRole !== role) {
        return redirect('/unauthorized');
    }

    return { ...user, role: actualRole };
}