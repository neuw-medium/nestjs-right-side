import {Controller, Post, Headers, Logger} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    
    private readonly logger = new Logger(AppController.name);
    
    constructor(private readonly appService: AppService) {}
    
    @Post("/user")
    getUser(@Headers("x-data-token") token: string): string {
        this.logger.log({
            message: `x-data-token -- header = ${token}`,
            token: token
        });
        return this.appService.getHello();
    }
}
