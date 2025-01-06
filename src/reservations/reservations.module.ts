import { Module } from '@nestjs/common';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';
import { ReservationsService } from './reservations.service';
import { ReservationRepository } from './reservations.repository';


@Module({
    imports:[DynamodbModule],
    providers:[ReservationsService, ReservationRepository],
    exports:[]
})
export class ReservationsModule {}
