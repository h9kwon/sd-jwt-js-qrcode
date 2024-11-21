import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';

const VerifierPage: React.FC = () => {
    const [vpData, setVpData] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    const verifyVP = async (vp: string) => {
        try {
            const response = await fetch('http://localhost:3001/verifier/verify-vp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vp }),
            });

            const result = await response.json();
            setIsVerified(result.verified);
        } catch (error) {
            console.error('Error verifying VP:', error);
            setIsVerified(false);
        }
    };

    return (
        <div>
            <h2>Verifier Page</h2>
            <QRScanner onScan={(data) => {
                setVpData(data);
                verifyVP(data);
            }} />
            {vpData && (
                <div>
                    <h3>Scanned VP Data:</h3>
                    <pre>{vpData}</pre>
                    {isVerified !== null && (
                        <p>{isVerified ? 'VP is verified!' : 'VP verification failed.'}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifierPage;