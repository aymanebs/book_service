import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
    constructor(private readonly reservationRepository: ReservationRepository) {}

    async create(reservationData: any): Promise<any> {
        await this.reservationRepository.create(reservationData);
        return { message: 'Reservation created' };
    }

    async getAll(): Promise<any> {
        const result = await this.reservationRepository.getAll();
        return result.Items;
    }

    async getByUserId(userId: string): Promise<any> {
        const result = await this.reservationRepository.getByUserId(userId);
        return result.Item;
    }

    async delete(id: string): Promise<any> {
        await this.reservationRepository.delete(id);
        return { message: 'Reservation deleted' };
    }
}
