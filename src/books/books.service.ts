import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class BooksService {
    constructor(@Inject('DYNAMODB_CLIENT') private readonly dynamoDbClient: DynamoDBDocumentClient){}

    async create(book: any ): Promise<any> {
        const params = {
          TableName: 'books', 
          Item:{
            id: uuidv4(),
            ...book,
          }
           
        };
        await  this.dynamoDbClient.send(new PutCommand(params));
        return { message: 'Book created successfully!' };
    }

    async getAll(): Promise<any>{
        const params = {
            TableName: 'books'
        }
        const books = await this.dynamoDbClient.send(new ScanCommand(params));
        return books.Items || [];
    }

    async getById(bookId: string): Promise<any>{
        const params = {
            TableName: 'books',
            Key: {id: bookId}
        }
        const book= await this.dynamoDbClient.send(new GetCommand(params));
        return book.Item;
    }

    async update(bookId: string, book: any): Promise<any>{
        const params= {
            TableName: 'books',
            UpdateExpression: 'SET title = :title, description = :description, author = :author, price = :price',
            ExpressionAttributeValues: {
                ':title': book.title,
                ':description': book.description,
                ':author': book.author,
                ':price': book.price,
              },
            Key: {id: bookId},
            ReturnValues: 'ALL_NEW' as 'ALL_NEW',  
        }
        const result = await this.dynamoDbClient.send(new UpdateCommand(params));
        return {message: 'Updated successfully', updatedBook: result.Attributes};
    }

    async delete(bookId: string): Promise<any>{
        const params= {
            TableName: 'books',
            Key: {id: bookId}
        }
        await this.dynamoDbClient.send(new DeleteCommand(params));
        return {message: 'Deleted successfully'}
    }
}
