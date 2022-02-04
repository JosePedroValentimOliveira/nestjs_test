import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { BookController } from './controllers/book.controller';
import { AppService } from './services/app.service';
import { BookService } from './services/book.service';
import { dbMain } from './config/db';
import { AuthorController } from './controllers/author.controller';
import { AuthorService } from './services/author.service';
dbMain();
@Module({
  imports: [],
  controllers: [AppController, BookController, AuthorController],
  providers: [AppService, BookService, AuthorService],
})
export class AppModule {}
