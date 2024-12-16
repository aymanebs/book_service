import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';

@Module({
    imports: [DynamodbModule],
    providers: [BooksService],
    controllers: [BooksController] 
})
export class BooksModule {}
