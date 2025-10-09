"use client"

import {create} from 'zustand'
import type {User} from 'firebase/auth'
import Lenis from 'lenis'
import { ContactItem, SponsorItem } from '@repo/model'

interface Store { 
    loading: boolean;
    setLoading: (loading: boolean) => void;
    initialAnimation: boolean;
    setInitialAnimation: (loading: boolean) => void;
    user: {user: User; details: any} | null;
    setUser: (user: {user: User; details: any} | null) => void;
    lenis: Lenis | undefined;
    setLenis: (lenis: Lenis | undefined) => void;
    contacts: ContactItem[];
    setContactItems: (contacts: ContactItem[]) => void;
    outreachPartners: SponsorItem[];
    setOutreachPartners: (outreachPartners: SponsorItem[]) => void;
    goodiesPartners: SponsorItem[];
    setGoodiesPartners: (goodiesPartners: SponsorItem[]) => void;
    titleSponsor: SponsorItem[];
    setTitleSponsor: (titleSponsor: SponsorItem[]) => void;
    imagesLoaded: boolean;
    setImagesLoaded: (imagesLoaded: boolean) => void;
}
export const useStore = create<Store>((set, get) => ({
    loading: true,
    setLoading: (loading) => set({loading}),
    initialAnimation: true,
    setInitialAnimation: (initialAnimation) => set({initialAnimation}),
    user: null,
    setUser: (user) => set({user}),
    lenis: undefined,
    setLenis: (lenis: Lenis | undefined) => set(() => ({ lenis })),
    contacts: [],
    setContactItems: (contacts) => set({contacts}),
    outreachPartners: [],
    setOutreachPartners: (outreachPartners) => set({outreachPartners}),
    goodiesPartners: [],
    setGoodiesPartners: (goodiesPartners) => set({goodiesPartners}),
    titleSponsor: [],
    setTitleSponsor: (titleSponsor) => set({titleSponsor}),
    imagesLoaded: false,
    setImagesLoaded: (imagesLoaded) => set({imagesLoaded})
}))