import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const IssuerPage: React.FC = () => {
    const [vc, setVc] = useState<string>('');
    const navigate = useNavigate(); // Hook to navigate programmatically

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
            // Redirect to the holder page with VC data as a query parameter
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
                        <QRCodeCanvas value={vc} size={256} />
                    </a>
                </div>
            )}
        </div>
    );
};

export default IssuerPage;