import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationService: ReservationsService) {}

    @Post()
    async create(@Body() createReservationDto: CreateReservationDto, @Param('bookId') bookId: string): Promise<any> {
        const reservationData = { ...createReservationDto, bookId };  // Spread the DTO directly
        return await this.reservationService.create(reservationData);
    }

    @Get()
    async getAll(): Promise<any> {
        return await this.reservationService.getAll();
    }

    @Delete('/:id')
    async delete(@Param('id') reservationId: string): Promise<any> {
        return await this.reservationService.delete(reservationId);
    }
}
