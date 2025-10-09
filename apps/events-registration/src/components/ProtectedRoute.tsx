"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useStore } from "@repo/store"

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const router = useRouter()
    const {user, loading}  = useStore()
    const pathname = usePathname();

    useEffect(() => {
        if (loading) {
            return
        }
        if(pathname === "/register") {
            if (!user) {
                router.replace("/")
            } else if (user.details) {
                router.replace("/dashboard")
            }
        }
        if(pathname === "/dashboard") {
            if(!user) {
                router.replace("/")
            } else if (!user.details) {
                router.replace("/register")
            }
        }
    }, [user, router, pathname, loading])

    return (
        <>
            {children}
        </>
    )
}