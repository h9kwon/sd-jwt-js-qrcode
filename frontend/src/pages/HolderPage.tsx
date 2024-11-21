import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRGenerator from '../components/QRGenerator';

const HolderPage: React.FC = () => {
    const [vc, setVc] = useState<string | null>(null);
    const [decodedVC, setDecodedVC] = useState<string | null>(null);
    const [decodedVCJson, setDecodedVCJson] = useState<any | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [vp, setVp] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Extract the query parameters from the URL
        const queryParams = new URLSearchParams(location.search);
        const vc = queryParams.get('vc');
        if (vc) {
            setVc(vc);
        }
    }, [location]); // Re-run effect when the location changes

    const decodeVC = async () => {
        try {
            const response = await fetch('http://localhost:3001/holder/decode-vc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vc })
            });
            if (response.status == 200) {
                console.log("response 200");
                const data = await response.json();
                setDecodedVCJson(data);
                setDecodedVC(JSON.stringify(data, null, 2));
            } else {
                console.error('Failed to decode VC:', response.statusText);
                setDecodedVC('Failed to decode VC.');
            }
        } catch (error) {
            console.error('Error decoding VC:', error);
            setDecodedVC('Error decoding VC.');
        }
    };

    // Function to handle the QR code click (simulating scan)
    const handleQrClick = () => {
        if (vp) {
            navigate(`/verifier?vp=${vp}`);
        }
    };

    const handleKeySelection = (key: string) => {
        setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const createVP = async () => {
        try {
            const presentationFrame = {} as Record<string, boolean>;
            selectedKeys.forEach(key => presentationFrame[key] = true);

            const response = await fetch('http://localhost:3001/holder/create-vp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vc, presentationFrame })
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('VP created successfully:', data);

                setVp(JSON.stringify(data, null, 2));
                alert('VP created successfully!');
            } else {
                console.error('Failed to create VP:', response.statusText);
                alert('Failed to create VP.');
            }
        } catch (error) {
            console.error('Error creating VP:', error);
            alert('Error creating VP.');
        }
    };

    return (
        <div>
            <h2>Holder Page</h2>
            {vc ? (
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
                        <h3>VC Data:</h3>
                        <p>{vc}</p> {/* Display the VC data on the screen */}
                        <button onClick={decodeVC}>Decode VC</button>
                    </div>
                </div>
            ) : (
                <p>No VC data found in the URL.</p>
            )}

            {decodedVC && (
                <div>
                    <div style={{
                        margin: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        alignItems: 'flex-start'
                    }}>
                        {/* Decoded VC Box */}
                        <div style={{
                            maxWidth: 'fit-content',
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'anywhere',
                            wordBreak: 'break-word',
                            border: '1px solid #ccc',
                            padding: '10px',
                            backgroundColor: '#eef9f9'
                        }}>
                            <h3>Decoded VC:</h3>
                            <p>{decodedVC}</p>
                        </div>

                        {/* Checkbox Selection */}
                        <div style={{
                            maxWidth: 'fit-content',
                            border: '1px solid #ccc',
                            padding: '10px',
                            backgroundColor: '#f9f9f9',
                            flex: '1'
                        }}>
                            <h3>Select Fields to Include in VP:</h3>
                            {decodedVCJson.disclosures?.map((disclosure: any) => (
                                <div key={disclosure.key} style={{ marginBottom: '8px' }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={disclosure.key}
                                            checked={selectedKeys.includes(disclosure.key)}
                                            onChange={() => handleKeySelection(disclosure.key)}
                                        />
                                        {` ${disclosure.key}`}
                                    </label>
                                </div>
                            ))}
                            <button onClick={createVP}>Create VP</button>
                            {vp && (
                                <div>
                                    <h3>Show this QR code to the Verifier</h3>
                                    <a onClick={handleQrClick}>
                                        {QRGenerator({ value: vp })}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HolderPage;