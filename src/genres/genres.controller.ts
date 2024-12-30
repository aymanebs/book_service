import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GenreService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {

    constructor(private readonly genreService: GenreService){}

    @Post()
    async create(@Body() createGenreDto: CreateGenreDto): Promise<any>{
        await this.genreService.create(createGenreDto);
        return {message: 'Genre created'};
    }

    @Get()
    async getAll(){
        return await this.genreService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') genreId: string){
        return await this.genreService.getById(genreId);
    }

    @Put('/:id')
    async update(@Param('id') genreId: string, @Body() updateGenreDto: UpdateGenreDto){
        return await this.genreService.update(genreId, updateGenreDto);      
    }

    @Delete('/:id')
    async delete(@Param('id') genreId: string){
        return await this.genreService.delete(genreId);
    }
}
