import { JWK, JWE } from "node-jose";
import fetch from 'cross-fetch';

class JWKSManager {
    jwks: Map<string, JWK.KeyStore> = new Map<string, JWK.KeyStore>();

    getKeystore(issuer: string) {
        if (this.jwks.has(issuer)) {
            return this.jwks.get(issuer)
        } else {
            return null;
        }
    }
    async fetchAndAddKeyStore(issuer: string, url?: string) {
        if (url) {
            await fetch(url).then(async res => {
                if (res.status === 200) {
                    let keys = await res.json();
                    try {
                        let keyStore:JWK.KeyStore = await JWK.asKeyStore(keys);
                        this.jwks.set(issuer, keyStore);
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
const jwksManager:JWKSManager = new JWKSManager();
export default jwksManager;

jwksManager.fetchAndAddKeyStore("http://localhost:8080", "http://localhost:8080/.well-known/jwks").then(async () => {
    console.log({...jwksManager.getKeystore("http://localhost:8080").get('345fc20b-e2f7-4e7a-a6e1-7b1f24d406d3')})
    let key: JWK.Key = jwksManager.getKeystore("http://localhost:8080").get('345fc20b-e2f7-4e7a-a6e1-7b1f24d406d3');
    for (let k of jwksManager.getKeystore("http://localhost:8080").all()) {
        console.log(k.kid);
    }
    
    let ll = key.toJSON();
    console.log(ll)
    
    let kk = key.toPEM();
    
    JWK.asKey(kk, 'pem').then(k => {
        JWE.createEncrypt(key).
        update(JSON.stringify({ "test":"test"})).
        final().
        then(function(result) {
            // {result} is a String -- JWE using the Compact Serialization
            console.log(result)
        });
    })
    
    /*key = await JWK.asKey(JSON.parse(JSON.stringify(key.toJSON())));

    await JWE.createEncrypt({
        "contentAlg": "RSA-OAEP-256",
    },key)
        .update(JSON.stringify({"tst":"asd"}))
        .final().then(function(result) {
        // {result} is a String -- JWE using the Compact Serialization
        console.log(result)
    });
    
    JWE.createEncrypt(key).
    update(JSON.stringify({ "test":"test"})).
    final().
    then(function(result) {
        // {result} is a String -- JWE using the Compact Serialization
        console.log(result)
    });*/
});
