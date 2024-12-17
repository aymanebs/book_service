import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookRepository{

    constructor(@Inject('DYNAMODB_CLIENT') private readonly dynamoDbClient: DynamoDBDocumentClient){}

    async create(bookData: any ): Promise<any>{

        const params= {
            TableName: 'books',
            Item: {
                id: uuidv4(),
                ...bookData
            }
        }
        const result = await this.dynamoDbClient.send(new PutCommand(params));
        return result;

    }

    async getAll(): Promise<any>{

        const params= {
            TableName: 'books'
        }

        const result = await this.dynamoDbClient.send(new ScanCommand(params));
        return result;
    }

    async getById(id: string): Promise<any>{

        const params= {
            TableName: 'books',
            Key: {id}
        }
        const result= await this.dynamoDbClient.send(new GetCommand(params));
        return result;
    }

    async update(id: string, bookData: any): Promise<any>{

        const params = {
            TableName: 'books',
            Key: { id },
            UpdateExpression: 'SET title = :title, description = :description, author = :author, price = :price',
            ExpressionAttributeValues: {
                ':title': bookData.title, 
                ':description': bookData.description,
                ':author': bookData.author,
                ':price': bookData.price,
            },
            ReturnValues: 'ALL_NEW' as 'ALL_NEW', 
        };    
        const result = await this.dynamoDbClient.send(new UpdateCommand(params));
        return result;
    }

    async delete(id: string): Promise<any>{

        const params={
            TableName: 'books',
            Key: {id}
        }

        const result= await this.dynamoDbClient.send(new DeleteCommand(params));
        return result;
    }
}