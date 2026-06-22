import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        adminClient()
    ]
})

// All auth methods come from the single configured client
export const { signIn, signUp, signOut, useSession } = authClient
