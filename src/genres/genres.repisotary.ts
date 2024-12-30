import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class GenreRepository{

    constructor(@Inject('DYNAMODB_CLIENT')private readonly dynamoDbClient: DynamoDBDocumentClient){}

    async create(genreData: any): Promise<any>{
        const params={
            TableName: 'genres',
            Item:{
                id: uuidv4(),
                ...genreData
            }
        }
        const result = await this.dynamoDbClient.send(new PutCommand(params));
        return result;
    }

    async getAll(): Promise<any>{
        const params={
            TableName: 'genres'
        }
        const result= await this.dynamoDbClient.send(new ScanCommand(params));
        return result;
    }

    async getById(id: string): Promise<any>{
        const params= {
            TableName: 'genres',
            Key: {id}
        }
        const result= await this.dynamoDbClient.send(new GetCommand(params));
        return result;
    }

    async update(id: string, genreData: any): Promise<any>{

        const params= {
            TableName: 'genres',
            Key: {id},
            UpdateExpression: 'SET title= :title',
            ExpressionAttributeValues:{
                ':title' : genreData.title
            },
            ReturnValues: 'ALL_NEW' as 'ALL_NEW',

        }
        const result = await this.dynamoDbClient.send(new UpdateCommand(params));
        return result;
    }

    async delete(id: string): Promise<any>{
        const params = {
            TableName: 'genres',
            Key: {id}
        }
        const result= await this.dynamoDbClient.send(new DeleteCommand(params));
        return result;
    }
}