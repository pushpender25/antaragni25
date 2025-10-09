import { DocumentData } from "firebase/firestore"

export interface doc extends DocumentData {}
export type time = | {
    seconds: number,
    nanoseconds: number
} | { toDate: () => Date, toMillis: () => number}

export * from "./src/auth"
export * from "./src/config"
export * from "./src/firestore"
export * from "./src/storage"
export * from "./src/InitialState"