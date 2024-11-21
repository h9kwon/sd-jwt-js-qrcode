import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc';
import { Request, Response } from 'express';
import { digest, ES256, generateSalt } from '@sd-jwt/crypto-nodejs';
import type { DisclosureFrame } from '@sd-jwt/types';

export const issueVC = async (req: Request, res: Response) => {
    // Logic for generating a Verifiable Credential
    console.log("Generating VC...");


    const { privateKey, publicKey } = await ES256.generateKeyPair();
    const signer = await ES256.getSigner(privateKey);
    const verifier = await ES256.getVerifier(publicKey);

    const sdjwt = new SDJwtVcInstance({
        signer,
        verifier,
        signAlg: ES256.alg,
        hasher: digest,
        hashAlg: 'SHA-256',
        saltGenerator: generateSalt,
    });

    const claims = {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        name: 'John Doe',
        degree: {
            type: 'BachelorDegree',
            name: 'Bachelor of Science and Arts',
            college: 'Example University',
            gpa: '4.0'
        }
    };

    const disclosureFrame: DisclosureFrame<typeof claims> = {
        _sd: ['id'],
        degree: {
            _sd: ['gpa'],
            _sd_decoy: 2,
        },
    };

    const credential = await sdjwt.issue(
        {
            iss: 'Issuer',
            iat: new Date().getTime(),
            vct: 'ExampleCredentials',
            ...claims,
        },
        disclosureFrame,
    );
    console.log("credential:", credential);

    res.status(200).json(credential);
};