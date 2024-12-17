import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamodbModule } from './dynamodb/dynamodb.module';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { BookRepository } from './books/books.repository';
import { GenresController } from './genres/genres.controller';
import { GenreService } from './genres/genres.service';
import { GenresModule } from './genres/genres.module';
import { GenreRepository } from './genres/genres.repisotary';

@Module({
  imports: [DynamodbModule, BooksModule, GenresModule],
  controllers: [AppController, BooksController, GenresController],
  providers: [AppService, BooksService, BookRepository, GenreService, GenreRepository],
})
export class AppModule {}
