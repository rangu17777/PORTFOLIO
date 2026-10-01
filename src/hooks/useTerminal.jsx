import { useState, useEffect, useCallback } from 'react';

export const useTerminal = (lines = [], speed = 50) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const startTyping = useCallback(async (newLines) => {
        setIsTyping(true);
        setDisplayedLines([]);

        // Helper to delay
        const wait = (ms) => new Promise(res => setTimeout(res, ms));

        for (const line of newLines) {
            // Simulate "processing" line by line
            setDisplayedLines(prev => [...prev, line]);
            await wait(800); // Wait between lines
        }

        setIsTyping(false);
    }, []);

    return { displayedLines, isTyping, startTyping };
};
