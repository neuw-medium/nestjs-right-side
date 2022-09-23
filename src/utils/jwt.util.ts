import { JWK, JWE } from "node-jose";
import fetch from 'cross-fetch';

export class JwtUtil {
    
    jwks: Map<string, JWK.KeyStore> = new Map<string, JWK.KeyStore>();
    
    async getKeystore(issuer: string): Promise<JWK.KeyStore> {
        if (this.jwks.has(issuer)) {
            return this.jwks.get(issuer)
        } else {
            let keystore = this.fetchAndAddKeyStore(issuer).then(m => {
                return m.get(issuer);
            });
            return keystore;
        }
    }

    async fetchAndAddKeyStore(issuer: string, url?: string) {
        if (url) {
            return await fetch(url).then(async res => {
                if (res.status === 200) {
                    let keys = await res.json();
                    try {
                        let keyStore:JWK.KeyStore = await JWK.asKeyStore(keys);
                        return this.jwks.set(issuer, keyStore);
                    } catch (e) {
                        console.error("error while converting keys to Keystore, ",e);
                    }
                } else {
                    console.error("Unable to fetch key set for the issuer, ", issuer);
                }
            });
        } else {
            return await fetch(issuer+"/.well-known/jwks").then(async res => {
                if (res.status === 200) {
                    let keys = await res.json();
                    try {
                        let keyStore:JWK.KeyStore = await JWK.asKeyStore(keys);
                        return this.jwks.set(issuer, keyStore);
                    } catch (e) {
                        console.error("error while converting keys to Keystore, ",e);
                    }
                } else {
                    console.error("Unable to fetch key set for the issuer, ", issuer);
                }
            })
        }
    }
    
}

const jwtUtil:JwtUtil = new JwtUtil();

export default jwtUtil;
