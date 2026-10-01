import { useState } from 'react';

export const useWebhook = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const triggerWebhook = async (data, mock = true) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (mock) {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log("Mock Webhook Payload:", data);
                setSuccess(true);
            } else {
                // REAL Automation Integration
                // Sending data to Make.com
                const WEBHOOK_URL = 'https://hook.eu2.make.com/pvcumf75jkggfnygg532ovpbcvmhcjax';

                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...data,
                        source: 'Portfolio_Website',
                        timestamp: new Date().toISOString()
                    })
                });

                if (!response.ok) throw new Error('Failed to connect to automation engine.');
                setSuccess(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setSuccess(false);
        setError(null);
        setLoading(false);
    };

    return { loading, success, error, triggerWebhook, reset };
};
