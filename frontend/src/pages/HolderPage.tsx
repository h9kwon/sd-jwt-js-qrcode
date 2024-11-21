import React, { useState } from 'react';
import QRCode, { QRCodeCanvas } from 'qrcode.react';

const HolderPage = () => {
    const [vc, setVc] = useState<string>('');
    const [vp, setVp] = useState<string>('');

    const presentVP = async () => {
        const response = await fetch('http://localhost:3001/holder/present-vp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vc })
        });
        const data = await response.json();
        setVp(data.vp);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Paste VC here"
                value={vc}
                onChange={(e) => setVc(e.target.value)}
            />
            <button onClick={presentVP}>Present VP</button>
            {vp && <QRCodeCanvas value={vp} />}
        </div>
    );
};

export default HolderPage;