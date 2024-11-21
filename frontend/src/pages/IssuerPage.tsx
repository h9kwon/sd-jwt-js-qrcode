import React, { useState } from 'react';
import QRCode, { QRCodeCanvas } from 'qrcode.react';

const IssuerPage: React.FC = () => {
    const [vc, setVc] = useState<string>('');

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

    return (
        <div>
            <h2>Issuer Page</h2>
            <button onClick={issueVC}>Issue VC</button>
            {vc && (
                <div>
                    <h3>Scan this QR code with the Holder</h3>
                    <QRCodeCanvas value={vc} size={256} />
                </div>
            )}
        </div>
    );
};

export default IssuerPage;