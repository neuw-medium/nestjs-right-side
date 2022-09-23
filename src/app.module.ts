import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtUtil } from "./utils/jwt.util";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, JwtUtil],
})
export class AppModule {}
