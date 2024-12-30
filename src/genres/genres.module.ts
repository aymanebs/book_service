import { Module } from '@nestjs/common';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';
import { GenresController } from './genres.controller';
import { GenreService } from './genres.service';
import { GenreRepository } from './genres.repisotary';


@Module({
    imports:[DynamodbModule],
    controllers:[GenresController],
    providers:[GenreService,GenreRepository],
})
export class GenresModule {}
