import { Request, Response } from 'express';
import { decodeSdJwt, getClaims } from '@sd-jwt/decode';
import { digest, generateSalt } from '@sd-jwt/crypto-nodejs';

export const decodeVC = async (req: Request, res: Response) => {
    // Logic for generating a Verifiable Credential
    console.log("Decoding VC...");
    console.log(req.body);
    const encodedVC = req.body.vc;

    try {

        const decodedSdJwt = await decodeSdJwt(encodedVC, digest);

        const claims = await getClaims(
            decodedSdJwt.jwt.payload,
            decodedSdJwt.disclosures,
            digest,
        );

        console.log('The claims are:'); // the full vc
        console.log(JSON.stringify(claims, null, 2));

        res.status(200).json(decodedSdJwt);
    } catch (error) {
        console.error('Error decoding SD-JWT:', error);
        res.status(400).json({ error: 'Error decoding SD-JWT' });
    }
};