import { useEffect, useState } from 'react';

// Phones and small touch screens. Desktop (>= 768px) never matches.
const QUERY = '(max-width: 767px)';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia(QUERY).matches
    );

    useEffect(() => {
        const mql = window.matchMedia(QUERY);
        const onChange = (e) => setIsMobile(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    return isMobile;
};

export default useIsMobile;
