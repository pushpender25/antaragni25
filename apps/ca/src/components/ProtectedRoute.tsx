"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@repo/store"

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const router = useRouter()
    const {user}  = useStore()

    useEffect(() => {
        if (!user) {
            router.replace("/")
        } else if (!user.details) {
            router.replace("/register")
        }
    })

    return (
        <>
            {children}
        </>
    )
}