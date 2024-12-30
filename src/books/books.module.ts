import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';
import { BookRepository } from './books.repository';

@Module({
    imports: [DynamodbModule],
    providers: [BooksService, BookRepository],
    controllers: [BooksController] 
})
export class BooksModule {}
