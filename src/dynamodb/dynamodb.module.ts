import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Module } from '@nestjs/common';

@Module({
    providers: [
    {
        provide: 'DYNAMODB_CLIENT',
        useFactory: ()=>{
            const client = new DynamoDBClient({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.SECRET_KEY_ID,
                    secretAccessKey: process.env.SECRET_ACCESS_KEY,
                }
            });
            return DynamoDBDocumentClient.from(client);
        },
    },
],
    exports: ['DYNAMODB_CLIENT'],
})
export class DynamodbModule {}
