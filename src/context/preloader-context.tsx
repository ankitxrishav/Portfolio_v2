"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Assuming ScrollTrigger is from gsap

interface PreloaderContextType {
    isLoaded: boolean;
    setLoaded: (loaded: boolean) => void;
    refreshScrollTriggers: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const setLoaded = useCallback((loaded: boolean) => {
        setIsLoaded(loaded);
    }, []);

    const refreshScrollTriggers = useCallback(() => {
        // Force refresh multiple times to catch layout shifts
        setTimeout(() => ScrollTrigger.refresh(), 100);
        setTimeout(() => ScrollTrigger.refresh(), 500);
        setTimeout(() => ScrollTrigger.refresh(), 1000);
    }, []);

    return (
        <PreloaderContext.Provider value={{ isLoaded, setLoaded, refreshScrollTriggers }}>
            {children}
        </PreloaderContext.Provider>
    );
}

export const usePreloader = () => {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error("usePreloader must be used within a PreloaderProvider");
    }
    return context;
};
