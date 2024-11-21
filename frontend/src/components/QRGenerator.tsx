import React from 'react';
import QRCode, { QRCodeCanvas } from 'qrcode.react';

interface QRGeneratorProps {
    value: string;
    size?: number;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ value, size = 256 }) => {
    return (
        <QRCodeCanvas
            value={value}
            size={size}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
        />
    );
};

export default QRGenerator;