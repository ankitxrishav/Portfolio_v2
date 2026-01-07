"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PreloaderContextType {
    isLoaded: boolean;
    setLoaded: (loaded: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
    isLoaded: false,
    setLoaded: () => { },
});

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <PreloaderContext.Provider value={{ isLoaded, setLoaded: setIsLoaded }}>
            {children}
        </PreloaderContext.Provider>
    );
};

export const usePreloader = () => useContext(PreloaderContext);
