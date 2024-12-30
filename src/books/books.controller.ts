import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService){}

    @Post()
    async create(@Body() createBookDto: CreateBookDto): Promise<any>{
        return await this.bookService.create(createBookDto);
    }

    @Get()
    async getAll(): Promise<any>{
        return await this.bookService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') bookId: string): Promise<any>{
        return await this.bookService.getById(bookId);
    }

    @Put('/:id')
    async update(@Param('id') bookId: any,@Body() updateBookDto: UpdateBookDto): Promise<any>{
        return await  this.bookService.update(bookId, updateBookDto);
    }

    @Delete('/:id')
    async delete(@Param('id') bookId: any): Promise<any>{
        return await  this.bookService.delete(bookId);
    }
}
