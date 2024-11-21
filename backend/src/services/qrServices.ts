import QRCode from 'qrcode';

export const generateQRCode = async (data: string): Promise<string> => {
    return await QRCode.toDataURL(data);
};

export const decodeQRCode = async (dataURL: string): Promise<string> => {
    // Logic to decode QR code from a Data URL
    return 'Decoded data';
};