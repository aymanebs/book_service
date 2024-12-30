import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Inject } from '@nestjs/common';

export class ReservationRepository {
    constructor(@Inject() private readonly dynamoDbClient: DynamoDBClient) {}

    async create(reservationData: any): Promise<any> {
        const params = {
            TableName: 'reservations',
            Item: reservationData,
        };
        return await this.dynamoDbClient.send(new PutCommand(params));
    }

    async getAll(): Promise<any> {
        const params = {
            TableName: 'reservations',
        };
        return await this.dynamoDbClient.send(new ScanCommand(params));
    }

    async getByUserId(userId: string): Promise<any> {
        const params = {
            TableName: 'reservations',
            Key: { userId },  // Ensure that userId is the partition key
        };
        return await this.dynamoDbClient.send(new GetCommand(params));
    }

    async delete(id: string): Promise<any> {
        const params = {
            TableName: 'reservations',
            Key: { id },  // Ensure that id is the primary key
        };
        return await this.dynamoDbClient.send(new DeleteCommand(params));
    }
}
