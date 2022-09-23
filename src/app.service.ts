import {faker} from "@faker-js/faker";
import jwtUtil, {JwtUtil} from "./utils/jwt.util";
import {JWE, JWK} from "node-jose";

export class AppService {
    
    getData(): any {
        let obj:any = {};
        for (let i = 1 ; i <= 3000; i++){
            obj[`data_${i}`] = faker.name.findName()+faker.name.jobTitle()
        }
        return obj;
    }
    
    async getDataEncrypted(): Promise<any> {
        let obj:any = {};
        for (let i = 1 ; i <= 3000; i++){
            obj[`data_${i}`] = faker.name.findName()+faker.name.jobTitle()
        }
        
        
        return await jwtUtil.getKeystore("http://localhost:30001").then(ks => {
            let keys:JWK.Key[] = ks.all().filter(k => {
                return k.kty === 'EC' && k.use === 'enc'
            });
    
            return JWE.createEncrypt({
                format: 'compact'
            }, keys[0]).update(JSON.stringify(obj)).final().then(function(result) {
                // {result} is a String -- JWE using the Compact Serialization
                /*console.log(result)*/
                return {
                    "data-token": result
                };
            });
        });
    }
}
