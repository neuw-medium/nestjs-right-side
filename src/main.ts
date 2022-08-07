import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import EnvConfig from "./utils/env-config";
import {textSync} from "figlet";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn'],
    });
    let config = EnvConfig.getConfig();
    console.log(config);
    await app.listen(config.port);
    return config;
}
bootstrap().then((c) => {
    console.log(`Server is up on port ${c.port}`)
    console.log(textSync(c.name.toUpperCase(), {
        font: 'Big',
        horizontalLayout: 'full'
    }));
});
