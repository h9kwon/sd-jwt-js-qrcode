import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const HolderPage = () => {
    const [vc, setVc] = useState<string>('');
    const [decodedVC, setDecodedVC] = useState<string | null>(null);
    const [decodedVCJson, setDecodedVCJson] = useState<any | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // Keys selected by the user


    const location = useLocation(); // Access the current location (URL)

    useEffect(() => {
        // Extract the query parameters from the URL
        const queryParams = new URLSearchParams(location.search);
        const vc = queryParams.get('vc'); // Get the 'vc' parameter from the query string
        if (vc) {
            setVc(vc); // Set the VC data if it's present in the URL
        }
    }, [location]); // Re-run effect when the location changes

    const decodeVC = async () => {
        try {
            const response = await fetch('http://localhost:3001/holder/decode-vc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vc }) // Send the VC to the backend for decoding
            });
            if (response.status == 200) {
                console.log("response 200");
                const data = await response.json();
                setDecodedVCJson(data); // Set the decoded VC JSON object
                setDecodedVC(JSON.stringify(data, null, 2)); // Pretty-print the decoded VC
            } else {
                console.error('Failed to decode VC:', response.statusText);
                setDecodedVC('Failed to decode VC.');
            }
        } catch (error) {
            console.error('Error decoding VC:', error);
            setDecodedVC('Error decoding VC.');
        }
    };

    const handleKeySelection = (key: string) => {
        setSelectedKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const createVP = async () => {
        try {
            const response = await fetch('http://localhost:3001/holder/create-vp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vc, selectedKeys }) // Send the selected keys and VC
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log('VP created successfully:', data);
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
                <div>
                    <h3>VC Data:</h3>
                    <div style={{ 
                        width: '600px',
                        whiteSpace: 'break-all',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                        border: '1px solid #ccc',
                        padding: '10px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <p>{vc}</p> {/* Display the VC data on the screen */}
                    </div>
                    <button onClick={decodeVC}>Decode VC</button>
                </div>
            ) : (
                <p>No VC data found in the URL.</p>
            )}

            {decodedVC && (
                <div>
                    <h3>Decoded VC:</h3>
                    <div style={{
                        maxWidth: '600px', 
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere',
                        wordBreak: 'break-word',
                        border: '1px solid #ccc',
                        padding: '10px',
                        backgroundColor: '#eef9f9'
                    }}>
                        <p>{decodedVC}</p> {/* Display the decoded VC data */}
                    </div>
                    <h3>Select Fields to Include in VP:</h3>
                    <div>
                        {decodedVCJson.disclosures?.map((disclosure: any) => (
                            <div key={disclosure.key}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={disclosure.key}
                                        checked={selectedKeys.includes(disclosure.key)}
                                        onChange={() => handleKeySelection(disclosure.key)}
                                    />
                                    {disclosure.key}
                                </label>
                            </div>
                        ))}
                    </div>

                    <button onClick={createVP}>Create VP</button>
                </div>
            )}
        </div>
    );
};

export default HolderPage;