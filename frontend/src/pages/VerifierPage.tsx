import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifierPage: React.FC = () => {
    const [vpData, setVpData] = useState<string | null>(null);
    const [decodedVP, setDecodedVP] = useState<string | null>(null);

    const location = useLocation();

    useEffect(() => {
        // Extract the query parameters from the URL
        const queryParams = new URLSearchParams(location.search);
        const vp = queryParams.get('vp');
        if (vp) {
            setVpData(vp);
        }
    }, [location]); // Re-run effect when the location changes

    const decodeVP = async () => {
        try {
            const response = await fetch('http://localhost:3001/verifier/decode-vp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vpData }),
            });

            const data = await response.json();
            setDecodedVP(JSON.stringify(data, null, 2));
            console.log('Decoded VP:', data);
        } catch (error) {
            console.error('Error decoding VP:', error);
        }
    };
    const verifyVP = async () => {
        try {
            const response = await fetch('http://localhost:3001/verifier/verify-vp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vpData }),
            });

            const result = await response.json();
            console.log('VP verification result:', result);
            if (result.verified) {
                alert('VP verified successfully!');
            } else {
                alert('Failed to verify VP.');
            }
        } catch (error) {
            console.error('Error verifying VP:', error);
            alert('Failed to verify VP.');
        }
    };

    return (
        <div>
            <h2>Verifier Page</h2>
            {vpData ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{
                        width: '750px',
                        margin: '30px',
                        whiteSpace: 'break-all',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                        border: '1px solid #ccc',
                        padding: '10px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3>VP Data:</h3>
                        <p>{vpData}</p> {/* Display the VC data on the screen */}
                        <button onClick={decodeVP}>Decode VP</button>
                        <button onClick={verifyVP}>Verify VP</button>
                    </div>
                </div>
            ) : (
                <p>No VP data found in the URL.</p>
            )}
            {decodedVP && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{
                        minWidth: '400px',
                        maxWidth: 'fit-content',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                        border: '1px solid #ccc',
                        padding: '10px',
                        backgroundColor: '#eef9f9'
                    }}>
                        <h3>Decoded VP:</h3>
                        <p>{decodedVP}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifierPage;