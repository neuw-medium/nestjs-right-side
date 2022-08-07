import * as jose from 'jose';

class Test {
    constructor() {
        jose.importJWK({
            "kty": "RSA",
            "e": "AQAB",
            "use": "enc",
            "kid": "345fc20b-e2f7-4e7a-a6e1-7b1f24d406d3",
            "alg": "RS256",
            "n": "zbEny9AtTn7aqLHEyZZJfHThSmZZrSlonGNkfJIblJtDrAoIVIg4OFwb3xe7pU4SC_hVUezkkYBrGbSF-IFiI1JtkVNyd9NrwxO0w_Tzk4a9gI9S2HOE57MZGUYK88IXkDmxN5JsGxrouob3FiwZB7wU8_ji0vTcS20aelYJB34L5Wi5iMTmcH_Lo58-WOoF9bn12PQzig0UmRS4Cj3o-FnFSLlXJU0ntomeapPxVA5qJC0ecJ00v7VKfhiZCIaDTkTuIEUSnReN_u6WJVPRiH22u1xnuxWb6-1pdP4Pws0u7YQNymhNBrsLnnrlMKbepp_TCM4mWBoEHFSpenhpAw"
        })
    }
    async doSomething() {
        let key: jose.KeyLike | Uint8Array = await jose.importJWK({
            "kty": "RSA",
            "e": "AQAB",
            "use": "enc",
            "kid": "345fc20b-e2f7-4e7a-a6e1-7b1f24d406d3",
            "alg": "RS256",
            "n": "zbEny9AtTn7aqLHEyZZJfHThSmZZrSlonGNkfJIblJtDrAoIVIg4OFwb3xe7pU4SC_hVUezkkYBrGbSF-IFiI1JtkVNyd9NrwxO0w_Tzk4a9gI9S2HOE57MZGUYK88IXkDmxN5JsGxrouob3FiwZB7wU8_ji0vTcS20aelYJB34L5Wi5iMTmcH_Lo58-WOoF9bn12PQzig0UmRS4Cj3o-FnFSLlXJU0ntomeapPxVA5qJC0ecJ00v7VKfhiZCIaDTkTuIEUSnReN_u6WJVPRiH22u1xnuxWb6-1pdP4Pws0u7YQNymhNBrsLnnrlMKbepp_TCM4mWBoEHFSpenhpAw"
        });
        const jwe = await new jose.CompactEncrypt(
            new TextEncoder().encode(JSON.stringify({'test':'test'})),
        )
            .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
            .encrypt(key);
        console.log('jwe', jwe);
        let key2: jose.KeyLike | Uint8Array = await jose.importJWK(
            {"kty":"EC","use":"enc","crv":"P-256","kid":"1c2f12de-3409-45e1-b25f-bcb6fec32568","x":"nzOj_cvs5-WBPxjrVsZFoQ31W_4qK1o9DhPRDpScdTY","y":"Wkg5NXfAgmOk6xRo8QCT8aLoTV5szAa4_zy1YFEm7Io","alg":"ECDH-ES+A256KW"}
        )
        const jwe2 = await new jose.CompactEncrypt(
            new TextEncoder().encode(JSON.stringify({'test':'test'})),
        ).setProtectedHeader({enc: 'A128CBC-HS256', alg: 'ECDH-ES+A256KW'}).encrypt(key2);
        console.log('jwe2', jwe2);
        /*const jwe2 = await new jose.EncryptJWT({'test':'test'})
            .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
            .replicateAudienceAsHeader().replicateIssuerAsHeader()
            .encrypt(key);
        console.log('jwe2', jwe2);*/
    }
}

let test:Test = new Test();
test.doSomething();
