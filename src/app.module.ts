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
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsService } from './reservations/reservations.service';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [DynamodbModule, BooksModule, GenresModule, ReservationsModule],
  controllers: [AppController, BooksController, GenresController, ReservationsController],
  providers: [AppService, BooksService, BookRepository, GenreService, GenreRepository, ReservationsService],
})
export class AppModule {}
