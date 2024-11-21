import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRGenerator from '../components/QRGenerator';

const IssuerPage: React.FC = () => {
    const [vc, setVc] = useState<string>('');
    const navigate = useNavigate();

    const issueVC = async () => {
        console.log('Issuing VC');
        const response = await fetch('http://localhost:3001/issuer/issue-vc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("response", response);
        const data = await response.json();
        console.log("data", JSON.stringify(data));
        setVc(data);
    };

    // Function to handle the QR code click (simulating scan)
    const handleQrClick = () => {
        if (vc) {
            navigate(`/holder?vc=${vc}`);
        }
    };

    return (
        <div>
            <h2>Issuer Page</h2>
            <button onClick={issueVC}>Issue VC</button>
            {vc && (
                <div>
                    <h3>Scan this QR code with the Holder</h3>
                    <a onClick={handleQrClick}>
                        {QRGenerator({ value: vc })}
                    </a>
                </div>
            )}
        </div>
    );
};

export default IssuerPage;