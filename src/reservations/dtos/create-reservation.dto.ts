import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  userId: string;

  @IsDateString()
  reservationDate: string;

  @IsString()
  status: string;

  @IsDateString()
  expirationDate: string;


  @IsOptional()
  @IsString()
  deliveryAddress?: string; 
}
