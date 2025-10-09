"use client"

import {useEffect} from "react";
import { useStore } from "@repo/store";
import { firebaseGetUser } from "@repo/firebase";

export function InitialState({document}:{document:string;}) {
    const {setUser, setLoading} = useStore()
    useEffect(() => {
        firebaseGetUser(document, setUser, setLoading)
    }, [document, setUser, setLoading])

    return null

}