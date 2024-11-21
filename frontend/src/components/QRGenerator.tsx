import React from 'react';
import QRCode, { QRCodeCanvas } from 'qrcode.react';

interface QRGeneratorProps {
    value: string;
    size?: number;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ value, size = 256 }) => {
    return (
        <div>
            <h3>Generated QR Code</h3>
            <QRCodeCanvas
                value={value}
                size={size}
                bgColor="#ffffff"
                fgColor="#000000"
                level="L"
                includeMargin={false}
            />
        </div>
    );
};

export default QRGenerator;