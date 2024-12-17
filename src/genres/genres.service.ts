import { Injectable } from '@nestjs/common';
import { GenreRepository } from './genres.repisotary';


@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository ){}

    async create(genreData: any): Promise<any>{
        await this.genreRepository.create(genreData);
        return {message: 'Genre created'};
    }

    async getAll(): Promise<any>{
        const result= await this.genreRepository.getAll();
        return result.Items || [];
    }

    async getById(genreId: string): Promise<any>{
        const result = await this.genreRepository.getById(genreId);
        return result?.Item;
    }

    async update(genreId: string, genreData: any): Promise<any>{
        const result= await this.genreRepository.update(genreId,genreData);
        return {message:'Genre updated',updatedGenre: result.Attributes};
    }

    async delete(genreId: string): Promise<any>{
        await this.genreRepository.delete(genreId);
        return {message: 'Genre deleted succesfully'};
    }
}
