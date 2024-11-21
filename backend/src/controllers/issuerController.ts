import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc';
import { Request, Response } from 'express';
import { digest, ES256, generateSalt } from '@sd-jwt/crypto-nodejs';
import type { DisclosureFrame } from '@sd-jwt/types';

let privateKey: any;
let publicKey: any;
let signer: any;
let verifier: any;
let sdjwtVcInstance: any;

/**************************************************************************/
/* you can customize claims and disclosure frame as per your requirements */
const claims = {
    id: 'did:example:abcdef123456',
    name: 'John Doe',
    degree: {
        type: 'BachelorDegree',
        name: 'Bachelor of Science and Arts',
        major: 'Computer Science',
        college: 'Example University',
        gpa: '4.0'
    }
};

const disclosureFrame: DisclosureFrame<typeof claims> = {
    _sd: ['name'],
    degree: {
        _sd: ['college', 'gpa'],
        _sd_decoy: 2,
    },
};
/**************************************************************************/

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

export const issueVC = async (req: Request, res: Response) => {
    console.log("Generating VC...");

    await initializeKeys();

    const credential = await sdjwtVcInstance.issue(
        {
            iss: publicKey,
            iat: new Date().getTime(),
            vct: 'ExampleCredentials',
            ...claims,
        },
        disclosureFrame,
    );
    console.log("credential:", credential);

    res.status(200).json(credential);
};