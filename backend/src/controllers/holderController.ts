import { Request, Response } from 'express';
import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc';
import { decodeSdJwt, getClaims } from '@sd-jwt/decode';
import { digest, ES256, generateSalt } from '@sd-jwt/crypto-nodejs';

let privateKey: any;
let publicKey: any;
let signer: any;
let verifier: any;
let sdjwtVcInstance: SDJwtVcInstance;

const initializeKeys = async () => {
    if (!sdjwtVcInstance) {
        const keyPair = await ES256.generateKeyPair();
        privateKey = keyPair.privateKey;
        publicKey = keyPair.publicKey;
        signer = await ES256.getSigner(privateKey);
        verifier = await ES256.getVerifier(publicKey);
        sdjwtVcInstance = new SDJwtVcInstance({
            signer,
            verifier,
            signAlg: ES256.alg,
            hasher: digest,
            hashAlg: 'SHA-256',
            saltGenerator: generateSalt,
        });
    }
};

export const decodeVC = async (req: Request, res: Response) => {
    await initializeKeys();

    console.log("Decoding VC...");

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

export const createVP = async (req: Request, res: Response) => {
    try {
        await initializeKeys();
    
        console.log("Creating VP...");

        const credential = req.body.vc;
        const presentationFrame = req.body.presentationFrame;
    
        const presentation = await sdjwtVcInstance.present(credential, presentationFrame);
    
        console.log("presentation in makevp", presentation);
    
        const holderSignature = await signer(presentation);
    
        const verifyResult = await verifier(presentation, holderSignature);
    
        console.log("holder's signature", holderSignature);
        console.log("verify result: ", verifyResult);

        const vp = {sdjwt: presentation, holderSignature: holderSignature};
        
        console.log('VP:', vp);
        res.status(200).json(vp);
    } catch (error) {
        console.error('Error creating VP:', error);
        res.status(400).json({ error: 'Error creating VP' });
    }
}