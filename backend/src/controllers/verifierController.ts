import { Request, Response } from 'express';
import { decodeSdJwt, getClaims } from '@sd-jwt/decode';
import { digest, ES256 } from '@sd-jwt/crypto-nodejs';

let verifier: any;

export const decodeVP = async (req: Request, res: Response) => {

    console.log("Decoding VC...");

    const encodedVP = JSON.parse(req.body.vpData);

    try {
        const decodedSdJwt = await decodeSdJwt(encodedVP.sdjwt, digest);

        const claims = await getClaims(
            decodedSdJwt.jwt.payload,
            decodedSdJwt.disclosures,
            digest,
        );

        console.log('The claims are:');
        console.log(JSON.stringify(claims, null, 2));

        res.status(200).json(decodedSdJwt);
    } catch (error) {
        console.error('Error decoding SD-JWT:', error);
        res.status(400).json({ error: 'Error decoding SD-JWT' });
    }
};

export const verifyVP = async (req: Request, res: Response) => {
    try {

        console.log("Verifying VP...");
        const vp = JSON.parse(req.body.vpData);
        console.log("vp: ", vp);
        const sdjwt = vp.sdjwt;
        const holderSignature = vp.holderSignature;
        const holderPublicKey = vp.holderPublicKey;

        verifier = await ES256.getVerifier(holderPublicKey);

        // verify the holder's signature
        const verifyResult = await verifier(sdjwt, holderSignature);
        console.log("signature verification result: ", verifyResult);

        // TODO: verify if the VP contains required claims

        res.status(200).json({ verified: verifyResult });
    } catch (error) {
        console.error('Error verifying VP:', error);
        res.status(400).json({ error: 'Error verifying VP' });
    }
}