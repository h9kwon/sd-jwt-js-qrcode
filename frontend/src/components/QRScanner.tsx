import React from 'react';
import { QrReader } from 'react-qr-reader';

interface QRScannerProps {
    onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
    return (
        <div>
            <h3>Scan QR Code</h3>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        onScan(result.getText());
                    }
                    if (error) {
                        console.error(error);
                    }
                }}
                constraints={{ facingMode: 'environment' }}
                // style={{ width: '100%' }}
            />
        </div>
    );
};

export default QRScanner;