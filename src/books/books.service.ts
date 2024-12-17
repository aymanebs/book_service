import { DeleteCommand, GetCommand, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { BookRepository } from './books.repository';


@Injectable()
export class BooksService {
    constructor(private readonly bookRepository: BookRepository){}

    async create(book: any ): Promise<any> {
        await  this.bookRepository.create(book);
        return { message: 'Book created successfully!' };
    }

    async getAll(): Promise<any>{
        const books = await this.bookRepository.getAll();
        return books.Items || [];
    }

    async getById(bookId: string): Promise<any>{
        const book= await this.bookRepository.getById(bookId);
        return book.Item;
    }

    async update(bookId: string, book: any): Promise<any>{
        const result = await this.bookRepository.update(bookId,book);
        return {message: 'Updated successfully', updatedBook: result.Attributes};
    }

    async delete(bookId: string): Promise<any>{
        await this.bookRepository.delete(bookId);
        return {message: 'Deleted successfully'}
    }
}
