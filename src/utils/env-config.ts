import * as defaultConfig from '../resources/env-config/base.json';
import {textSync} from 'figlet';

export default class EnvConfig {
    
    static getConfig():any {
        let config = defaultConfig;
        let env = process.env.profile || 'base';
        if (env !== 'base') {
            /*readFileSync*/
            let path = `../resources/env-config/${env}.json`;
            console.info("defaultConfig", defaultConfig);
            try {
                import(path).then(dynamicConfig => {
                    //console.info("dynamicConfig", dynamicConfig);
                    if (dynamicConfig) {
                        for (const key of Object.keys(dynamicConfig)) {
                            console.info(`overriding the key based on ${env} profile, `, key)
                            config[key] = dynamicConfig[key];
                        }
                    }
                }).catch((e) => {
                    console.error(`error while loading the overriding env = ${env} json file`, e.message);
                });
            } catch (e) {
                console.error(`error while loading the overriding env = ${env} json file (will fallback to the default config) - `, e.message);
            }
        }
        return config;
    }
    
}
