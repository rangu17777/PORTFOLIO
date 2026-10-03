// Decides how much visual effect a device can comfortably run.
// "low": weak CPU/memory, data saver on, or reduced motion requested.
const detectTier = () => {
    if (typeof window === 'undefined') return 'high';
    const nav = window.navigator || {};
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = nav.connection?.saveData === true;
    const cores = nav.hardwareConcurrency || 8;
    const memory = nav.deviceMemory || 8; // GB, Chromium only
    const weakHardware = cores <= 2 || memory <= 2 || (cores <= 4 && memory <= 4);
    return reducedMotion || saveData || weakHardware ? 'low' : 'high';
};

export const deviceTier = detectTier();
export const isLowEnd = deviceTier === 'low';
export const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
